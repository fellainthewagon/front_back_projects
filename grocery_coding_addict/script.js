const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.querySelector("#grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");

let editFlag = false;
let editId = "";
let editTitle;

/* * * * * * * * * EVENT LISTENERS * * * * * * * * */

form.addEventListener("submit", addItem);

clearBtn.addEventListener("click", clearList);

document.addEventListener("DOMContentLoaded", setItemsFromLS);

/* * * * * * * * * INTERACTION WITH SUBMIT FORM * * * * * * * * */

function addItem(e) {
  e.preventDefault();
  const value = grocery.value;
  const id = new Date().getTime().toString();

  if (value && !editFlag) {
    itemUI(id, value);
    alertUI("item added to the list", "success");
    container.classList.add("show-container");

    addToLS(id, value);
    setDefault();
  } else if (value && editFlag) {
    editTitle.textContent = value;
    alertUI("value changed", "success");

    editLS(editId, value);
    setDefault();
  } else {
    alertUI("please enter value", "danger");
  }
}

/* * * * * * * * * ADD ITEM TO UI * * * * * * * * */

function itemUI(id, value) {
  const elem = document.createElement("article");
  elem.classList.add("grocery-item");
  const att = document.createAttribute("data-id");
  att.value = id;
  elem.setAttributeNode(att);

  elem.innerHTML = `
        <p class="title">${value}</p>
        <div class="btn-container">
        <button type="button" class="edit-btn">
            <i class="fas fa-edit"></i>
        </button>
        <button type="button" class="delete-btn">
            <i class="fas fa-trash"></i>
        </button>
        </div>
    `;
  list.append(elem);

  //   deleting and editing items
  const deleteBtn = elem.querySelector(".delete-btn");
  const editBtn = elem.querySelector(".edit-btn");

  deleteBtn.addEventListener("click", deleteItem);
  editBtn.addEventListener("click", editItem);
}

/* * * * * * * * * ADD MESSAGE AFTER ACTION TO UI * * * * * * * * */

function alertUI(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);
  setTimeout(
    () => ((alert.textContent = ""), alert.classList.remove(`alert-${action}`)),
    1000
  );
}

/* * * * * * * * * CLEAR LIST OF ITEMS * * * * * * * * */

function clearList() {
  const items = document.querySelectorAll(".grocery-item");

  if (items) items.forEach((item) => list.removeChild(item));
  container.classList.remove("show-container");

  alertUI("empty list", "danger");
  setDefault();

  localStorage.removeItem("list");
}

/* * * * * * * * * SET DEFAULT PARAMS * * * * * * * * */

function setDefault() {
  grocery.value = "";
  editFlag = false;
  editId = "";
  submitBtn.textContent = "submit";
}

/* * * * * * * * * DELETE ITEM FROM LIST * * * * * * * * */

function deleteItem(e) {
  const item = e.currentTarget.closest(".grocery-item");
  const id = item.dataset.id;
  list.removeChild(item);

  if (list.children.length === 0) container.classList.remove("show-container");

  alertUI("item removed", "danger");
  setDefault();

  removeFromLS(id);
}

/* * * * * * * * * EDIT ITEM * * * * * * * * */

function editItem(e) {
  const item = e.target.closest(".grocery-item");
  editTitle = e.currentTarget.parentElement.previousElementSibling;

  submitBtn.textContent = "edit";
  grocery.value = editTitle.textContent;
  editFlag = true;
  editId = item.getAttribute("data-id");
}

/*  */
/* * * * * * * * * LOCAL STORAGE * * * * * * * * */
/*  */

/* * * * * * * * * ADD ITEM TO LS * * * * * * * * */

function addToLS(id, value) {
  const newItem = { id, value };

  let items = getLS();

  items.push(newItem);
  localStorage.setItem("list", JSON.stringify(items));
}

/* * * * * * * * * REMOVE ITEM FROM LS * * * * * * * * */

function removeFromLS(id) {
  let items = getLS();

  items = items.filter((item) => item.id !== id);

  localStorage.setItem("list", JSON.stringify(items));
}

/* * * * * * * * * EDIT ITEM FROM LS * * * * * * * * */

function editLS(id, value) {
  let items = getLS();

  items = items.map((item) => (item.id === id ? { id, value } : item));

  localStorage.setItem("list", JSON.stringify(items));
}

/* * * * * * * * * GET ITEMS FROM LS * * * * * * * * */

function getLS() {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}

/* * * * * * * * * SET ITEMS TO UI FROM LS * * * * * * * * */

function setItemsFromLS() {
  let items = getLS();

  if (items) {
    items.forEach((item) => {
      itemUI(item.id, item.value);
    });

    container.classList.add("show-container");
  }
}
