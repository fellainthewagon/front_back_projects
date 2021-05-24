const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const giveaway = document.querySelector(".giveaway");
const deadline = document.querySelector(".deadline");
const items = document.querySelectorAll(".deadline-format h4");

/* temp items */
let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();

/* set end time to UI*/
const futureDate = new Date(tempYear, tempMonth, tempDay + 10, 00, 00, 0);

const year = futureDate.getFullYear();
let month = months[futureDate.getMonth()];
const day = futureDate.getDate();
const weekday = weekdays[futureDate.getDay()];
let hours = futureDate.getHours();
hours < 10 ? (hours = "0" + hours) : hours;
let minutes = futureDate.getMinutes();
minutes < 10 ? (minutes = "0" + minutes) : minutes;

giveaway.textContent = `
    giveaway ends on ${weekday}, ${day} ${month} ${year} ${hours}:${minutes}am
`;

/* set time remaining to UI */
const futureTime = futureDate.getTime();

function getTimeRemaining() {
  const today = new Date().getTime();
  const t = futureDate - today;

  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMin = 60 * 1000;

  let days = Math.floor(t / oneDay);
  let hours = Math.floor((t % oneDay) / oneHour);
  let minutes = Math.floor((t % oneHour) / oneMin);
  let seconds = Math.floor((t % oneMin) / 1000);

  const arr = [days, hours, minutes, seconds].map((t) =>
    t < 10 ? "0" + t : t
  );

  items.forEach((item, i) => (item.textContent = arr[i]));

  if (t < 0) {
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class="expired">sorry, this giveaway has expired!</h4>`;
  }
}

let countdown = setInterval(getTimeRemaining, 1000);
getTimeRemaining();
