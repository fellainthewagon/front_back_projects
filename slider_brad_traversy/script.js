const slides = document.querySelectorAll(".slide");
const next = document.querySelector("#next");
const prev = document.querySelector("#prev");

const auto = false;
const interval = 5000;
let slideInterval;

const nextSlide = () => {
  const curr = document.querySelector(".current");
  curr.classList.remove("current");
  if (curr.nextElementSibling) {
    curr.nextElementSibling.classList.add("current");
  } else {
    slides[0].classList.add("current");
  }

  //   setTimeout(() => curr.classList.remove("current"));
};

const prevSlide = () => {
  const curr = document.querySelector(".current");
  curr.classList.remove("current");
  if (curr.previousElementSibling) {
    curr.previousElementSibling.classList.add("current");
  } else {
    slides[slides.length - 1].classList.add("current");
  }

  //   setTimeout(() => curr.classList.remove("current"));
};

next.addEventListener("click", (e) => {
  nextSlide();
  if (auto) {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, interval);
  }
});

prev.addEventListener("click", (e) => {
  prevSlide();
  if (auto) {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, interval);
  }
});

if (auto) {
  slideInterval = setInterval(nextSlide, interval);
}
