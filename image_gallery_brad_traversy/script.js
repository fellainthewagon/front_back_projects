const [current, images] = [
  document.querySelector("#current"),
  document.querySelectorAll(".images img"),
];

const opacity = 0.5;
const isRun = true;
const interval = 5000;
let timeInterval;
let index = 1;

images[0].style.opacity = opacity;

/* funcs */
const imgClick = (e) => {
  current.src = e.target.src;

  /* set current index */
  images.forEach((img, j) => {
    img.style.opacity = 1;

    if (img.src === current.src) {
      index = j + 1;
    }
  });

  /* set animation */
  current.classList.add("fade-in");
  setTimeout(() => current.classList.remove("fade-in"), 500);
  e.target.style.opacity = opacity;

  /* rerun  timeInterval*/
  if (isRun) {
    clearInterval(timeInterval);
    timeInterval = setInterval(runInterval, interval);
  }
};

const runInterval = () => {
  if (index > images.length - 1) index = 0;

  current.src = images[index].src;

  current.classList.add("fade-in");
  setTimeout(() => current.classList.remove("fade-in"), 500);

  index++;
};

/* click changing */
images.forEach((img) => img.addEventListener("click", imgClick));

/* time interval changing */
if (isRun) {
  timeInterval = setInterval(runInterval, interval);
}
