const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

io.on("connection", (socket) => {
  console.log("user connected");
});

server.listen(8080, (err) => {
  if (err) {
    throw Error(err);
  }
  console.log("Example app listening on port 8080!");
});
