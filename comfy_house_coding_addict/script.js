const cartBtn = document.querySelector(".cart-btn");
const closeCart = document.querySelector(".close-cart");
const clearCart = document.querySelector(".clear-cart");
const cartDOM = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
const productsDOM = document.querySelector(".products-center");

let cart = [];
let btnsDOM = [];

/* * * * * * * * GET PRODUCTS from JSON * * * * * * * */
class Products {
  async getProducts() {
    try {
      let res = await fetch("products.json");
      let data = await res.json();

      /* destructuring json */
      let prod = data.items;

      prod = prod.map((item) => {
        const { title, price } = item.fields;
        const { id } = item.sys;
        const image = item.fields.image.fields.file.url;
        return { title, price, id, image };
      });

      return prod;
    } catch (error) {
      console.log(error);
    }
  }
}

/* * * * * * * * SET PRODUCTS to UI * * * * * * * */
class UI {
  displayProducts(products) {
    let result = "";

    products.forEach((product) => {
      result += `
        <article class="product">
        <div class="img-container">
          <img class="product-img" src=${product.image} alt="product"/>
          <button class="bag-btn" data-id=${product.id}>
            <i class="fas fa-shopping-cart"></i>add to cart
          </button>
        </div>
        <h3>${product.title}</h3>
        <h4>${product.price}</h4>
        </article>
      `;
    });

    productsDOM.innerHTML = result;
  }

  /* grab all btns dinamicly when DOM Content is Loaded */
  getBagBtns() {
    const btns = [...document.querySelectorAll(".bag-btn")];
    btnsDOM = btns;

    btns.forEach((btn) => {
      let id = btn.dataset.id;
      let inCart = cart.find((item) => item.id === id);

      /* disable btn when you add product in a Cart */
      if (inCart) {
        btn.innerText = "In Cart";
        btn.disabled = true;
      }

      btn.addEventListener("click", (e) => {
        e.target.innerText = "In Cart";
        e.target.disabled = true;

        /* get product from products (LS) & them to cart */
        let cartItem = { ...Storage.getProduct(id), amount: 1 };
        cart.push(cartItem);

        /* save cart in LS */
        Storage.saveCart(cart);

        /* set cart values (prices & amount of prod) */
        this.setCartValues(cart);

        /* display Cart item  */
        this.addCartItem(cartItem);

        /* show Cart */
        this.showCart();
      });
    });
  }

  setCartValues(cart) {
    let total = 0;
    let itemsTotal = 0;

    cart.map((item) => {
      total += item.price * item.amount;
      itemsTotal += item.amount;
    });

    cartTotal.innerText = parseFloat(total.toFixed(2));
    cartItems.innerText = itemsTotal;
  }

  addCartItem(item) {
    const div = document.createElement("div");
    div.classList.add("cart-item");

    div.innerHTML = `
      <img src=${item.image} alt="product" />
      <div>
        <h4>${item.title}</h4>
        <h5>${item.price}</h5>
        <span class="remove-item" data-id=${item.id}>remove</span>
      </div>
      <div>
        <i class="fas fa-chevron-up" data-id=${item.id}></i>
        <p class="item-amount">${item.amount}</p>
        <i class="fas fa-chevron-down" data-id=${item.id}></i>
      </div>
    `;

    cartContent.appendChild(div);
  }

  showCart() {
    cartOverlay.classList.add("transparentBcg");
    cartDOM.classList.add("showCart");
  }

  setupAPP() {
    cart = Storage.getCart();
    this.setCartValues(cart);
    this.populateCart(cart);
    cartBtn.addEventListener("click", this.showCart);
    closeCart.addEventListener("click", this.hideCard);
  }

  populateCart(cart) {
    cart.forEach((item) => this.addCartItem(item));
  }

  hideCard() {
    cartOverlay.classList.remove("transparentBcg");
    cartDOM.classList.remove("showCart");
  }

  cartLogic() {
    /* clear Cart */
    clearCart.addEventListener("click", () => this.clearCart());

    /* add Event Listener to Cart functionality */
    cartContent.addEventListener("click", (e) => {
      if (e.target.classList.contains("remove-item")) {
        let removeItem = e.target;
        let id = removeItem.dataset.id;

        /* remove prod from UI & other logic */
        cartContent.removeChild(removeItem.parentElement.parentElement);
        this.removeItem(id);
      }

      if (e.target.classList.contains("fa-chevron-up")) {
        let addAmount = e.target;
        let id = addAmount.dataset.id;
        let changeAmountItem = cart.find((item) => item.id === id);
        changeAmountItem.amount += 1;

        /* update LS & values */
        Storage.saveCart(cart);
        this.setCartValues(cart);
        addAmount.nextElementSibling.innerText = changeAmountItem.amount;
      }

      if (e.target.classList.contains("fa-chevron-down")) {
        let lowerAmount = e.target;
        let id = lowerAmount.dataset.id;
        let changeAmountItem = cart.find((item) => item.id === id);
        changeAmountItem.amount -= 1;

        if (changeAmountItem.amount) {
          /* update LS & values */
          Storage.saveCart(cart);
          this.setCartValues(cart);
          lowerAmount.previousElementSibling.innerText =
            changeAmountItem.amount;
        } else {
          /* remove prod from UI & other logic */
          cartContent.removeChild(lowerAmount.parentElement.parentElement);
          this.removeItem(id);
        }
      }
    });
  }

  clearCart() {
    let cartItems = cart.map((item) => item.id);
    cartItems.forEach((id) => this.removeItem(id));

    /* remove prods from UI Cart */
    while (cartContent.children.length) {
      cartContent.removeChild(cartContent.children[0]);
    }
    this.hideCard();
  }

  removeItem(id) {
    cart = cart.filter((item) => item.id !== id);
    this.setCartValues(cart);
    Storage.saveCart(cart);

    /* set default btn style */
    let btn = this.getSingleButton(id);
    btn.disabled = false;
    btn.innerHTML = `<i class="fas fa-shopping-cart"></i>add to cart`;
  }

  getSingleButton(id) {
    return btnsDOM.find((btn) => btn.dataset.id === id);
  }
}

/*  */
class Storage {
  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }

  static getProduct(id) {
    let products = JSON.parse(localStorage.getItem("products"));
    return products.find((product) => product.id === id);
  }

  static saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  static getCart() {
    return localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
  }
}

/*  */
document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  const products = new Products();

  /* setup App */
  ui.setupAPP();

  /* get prods & display UI */
  products
    .getProducts()
    .then((products) => {
      ui.displayProducts(products);
      Storage.saveProducts(products);
    })
    .then(() => {
      ui.getBagBtns();
      ui.cartLogic();
    });
});
