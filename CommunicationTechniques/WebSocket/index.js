const express = require("express");
const { createServer } = require('node:http');
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const port = 3000;

const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("chat message", (msg) => {
    console.log('received message', msg);
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
