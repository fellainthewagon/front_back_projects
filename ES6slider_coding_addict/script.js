import data from "./data.js";

const [next, prev] = [
  document.querySelector(".next-btn"),
  document.querySelector(".prev-btn"),
];

const container = document.querySelector(".slide-container");

container.innerHTML = data
  .map((person, i) => {
    const { img, name, job, text } = person;
    let pos = "next";
    if (i === 0) pos = "active";
    if (i === data.length - 1) pos = "last";

    return `
        <article class="slide ${pos}">
            <img class="img" src="${img}" class="img" alt="${name}"/>
            <h4>${name}</h4>
            <p class="title">${job}</p>
            <p class="text">${text}</p>
            <div class="quote-icon">
                <div class="fas fa-quote-right"></div>
            </div>
        </article>
      `;
  })
  .join("");

next.addEventListener("click", () => {
  go();
});

prev.addEventListener("click", () => {
  go("prev");
});

function go(type) {
  const active = document.querySelector(".active");
  const last = document.querySelector(".last");
  let next = active.nextElementSibling;

  if (!next) next = container.firstElementChild;

  active.classList.remove(["active"]);
  last.classList.remove(["last"]);
  next.classList.remove(["next"]);

  if (type === "prev") {
    active.classList.add("next");
    last.classList.add("active");
    next = last.previousElementSibling;

    if (!next) next = container.lastElementChild;
    next.classList.remove(["next"]);
    next.classList.add("last");

    return;
  }

  active.classList.add("last");
  last.classList.add("next");
  next.classList.add("active");
}
