const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.json());


app.post("/", (req, res) => {
    res.send('post hello')
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

io.on("connection", (socket) => {
  socket.on('comment', (msg) => {
        io.emit('comment', msg);
    })
});

server.listen(8080, (err) => {
  if (err) {
    throw Error(err);
  }
  console.log("Example app listening on port 8080!");
});
