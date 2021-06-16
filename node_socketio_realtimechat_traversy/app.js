const express = require("express");
const http = require("http");
const path = require("path");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = process.env.PORT || 3000;

/* run when client connects */
io.on("connection", (socket) => {
  /* welcome current user */
  socket.emit("message", "Welcome to ChatCord!");

  /* broadcast when user connects */
  socket.broadcast.emit("message", "A user has joined the chat");

  /* when user disconnects */
  socket.on("disconnect", () => {
    io.emit("message", "A user has left the chat");
  });

  /* listen chat message */
  socket.on("chatMessage", (msg) => {
    io.emit("message", msg);
  });
});

/* set static folder */
app.use(express.static(path.join(__dirname, "public")));

/* start */
server.listen(PORT, () =>
  console.log(`Server has been started on port: ${PORT}`)
);
