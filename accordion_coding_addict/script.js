const [plusBtns, minusBtns] = [
  document.querySelectorAll(".plus-icon"),
  document.querySelectorAll(".minus-icon"),
];

plusBtns.forEach((plus) =>
  plus.addEventListener("click", () => {
    const questionElem = plus.closest(".question");
    for (let child of questionElem.parentElement.children) {
      child.classList.remove("show-text");
    }

    questionElem.classList.add("show-text");
  })
);

minusBtns.forEach((minus) =>
  minus.addEventListener("click", () => {
    const questionElem = minus.closest(".question");
    questionElem.classList.remove("show-text");
  })
);
