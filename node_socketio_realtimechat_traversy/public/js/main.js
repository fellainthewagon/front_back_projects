const chatForm = document.querySelector("#chat-form");

const socket = io();

/* msg from server */
socket.on("message", (message) => {
  console.log(message);
  displayMessage(message);
});

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const msg = e.target.elements.msg.value;

  /* emit message to server */
  socket.emit("chatMessage", msg);
});

function displayMessage(message) {
  const div = document.createElement("div");

  div.classList.add("message");
  div.innerHTML = `
    <p class="meta">Brad <span>9:12pm</span></p>
    <p class="text">${message}</p>
  `;

  document.querySelector(".chat-messages").appendChild(div);
}
