const chatForm = document.querySelector("#chat-form");
const chatMessages = document.querySelector(".chat-messages");
const roomName = document.getElementById("room-name");
const userList = document.getElementById("users");

/* get info from url string */
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const socket = io();

/* join chatroom */
socket.emit("joinRoom", { username, room });

socket.on("roomUsers", ({ room, users }) => {
  outputRoom(room);
  outputUsers(users);
});

/* msg from server */
socket.on("message", (message) => {
  console.log(message);
  displayMessage(message);

  chatMessages.scrollTop = chatMessages.scrollHeight;
});

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const msg = e.target.elements.msg.value;

  /* emit message to server */
  socket.emit("chatMessage", msg);

  /* clear input & save focus */
  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});

function displayMessage(message) {
  const div = document.createElement("div");

  div.classList.add("message");
  div.innerHTML = `
    <p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">${message.text}</p>
  `;

  document.querySelector(".chat-messages").appendChild(div);
}

function outputRoom(room) {
  roomName.innerHTML = room;
}

function outputUsers(users) {
  userList.innerHTML = `
    ${users.map((user) => `<li>${user.username}</li>`).join("")}
  `;
}
