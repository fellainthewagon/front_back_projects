/* set date */

const date = document.querySelector("#date");
date.innerHTML = new Date().getFullYear();

const [navToggle, linksContainer, links] = [
  document.querySelector(".nav-toggle"),
  document.querySelector(".links-container"),
  document.querySelector(".links"),
];

/* show nav links */

navToggle.addEventListener("click", () => {
  const containerH = linksContainer.getBoundingClientRect().height;
  const linksH = links.getBoundingClientRect().height;

  containerH === 0
    ? (linksContainer.style.height = `${linksH}px`)
    : (linksContainer.style.height = 0);
});

/* show nav bar an fixed it, show scroll-to-top btn */

const [navbar, toplinkBtn] = [
  document.querySelector("#nav"),
  document.querySelector(".top-link"),
];
const navH = navbar.getBoundingClientRect().height;

window.addEventListener("scroll", () => {
  const scrollH = window.pageYOffset;

  scrollH > navH
    ? navbar.classList.add("fixed-nav")
    : navbar.classList.remove("fixed-nav");

  scrollH > 500
    ? toplinkBtn.classList.add("show-link")
    : toplinkBtn.classList.remove("show-link");
});

/* scroll from links to sections */

const scrollLinks = document.querySelectorAll(".scroll-link");

scrollLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const id = e.target.getAttribute("href").slice(1);
    const element = document.getElementById(id);

    const navH = navbar.getBoundingClientRect().height;
    const containerH = linksContainer.getBoundingClientRect().height;

    let target = element.offsetTop - navH;

    if (!navbar.classList.contains("fixed-nav")) {
      target = target - navH;
    }

    if (navH > 82) {
      target = target + containerH;
    }

    window.scrollTo(0, target);
    linksContainer.style.height = 0;
  });
});
