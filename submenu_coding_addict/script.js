import sublinks from "./data.js";

const toggleBtn = document.querySelector(".toggle-btn");
const closeBtn = document.querySelector(".close-btn");
const sidebarWrapper = document.querySelector(".sidebar-wrapper");
const sidebar = document.querySelector(".sidebar-links");
const linkBtns = [...document.querySelectorAll(".link-btn")];
const submenu = document.querySelector(".submenu");
const hero = document.querySelector(".hero");
const nav = document.querySelector(".nav");

/* * * * * * * * HIDE/SHOW SIDEBAR * * * * * * * */

toggleBtn.addEventListener("click", () => {
  sidebarWrapper.classList.add("show");
});

closeBtn.addEventListener("click", () => {
  sidebarWrapper.classList.remove("show");
});

/* * * * * * * * SET SIDEBAR * * * * * * * */

sidebar.innerHTML = sublinks
  .map((item) => {
    const { links, page } = item;
    return `
      <article>
        <h4>${page}</h4>
        <div class="sidebar-sublinks">
          ${links
            .map((link) => {
              return `
                <a href="${link.url}">
                  <i class="${link.icon}"></i>
                  ${link.label}
                </a>
              `;
            })
            .join("")}
        </div>
      </article>
    `;
  })
  .join("");

/* * * * * * * * SET SUBMENUs * * * * * * * */

linkBtns.forEach((link) => {
  link.addEventListener("mouseover", (e) => {
    const text = e.currentTarget.textContent;
    const tBtn = e.currentTarget.getBoundingClientRect();
    const bottom = tBtn.bottom - 3;
    const center = (tBtn.left + tBtn.right) / 2;

    const tPage = sublinks.find((item) => item.page === text);
    if (tPage) {
      submenu.classList.add("show");
      submenu.style.left = `${center}px`;
      submenu.style.top = `${bottom}px`;

      const { page, links } = tPage;

      let columns = "col-2";
      if (links.length === 3) columns = "col-3";

      submenu.innerHTML = `
        <section>
          <h4>${page}</h4>
          <div class="submenu-center ${columns}">
            ${links
              .map((link) => {
                return `
                  <a href="${link.url}">
                    <i class="${link.icon}"></i>
                    ${link.label}
                  </a>
                `;
              })
              .join("")}
          </div>
        </section>
      `;
    }
  });
});

/* * * * * * * * HIDE SUBMENUs * * * * * * * */

hero.addEventListener("mouseover", (e) => {
  submenu.classList.remove("show");
});

nav.addEventListener("mouseover", (e) => {
  if (!e.target.classList.contains("link-btn"))
    submenu.classList.remove("show");
});
