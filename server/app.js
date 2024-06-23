require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const server = http.createServer(app);
const morgan = require("morgan");
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// Using Middlewares
app.use(cors());
app.use(morgan("dev"));

//Routes
app.get("/", (req, res) => {
  res.send("Welcome to home page");
});

//Listening Socket.io events
io.on("connection", (socket) => {
  console.log("socket connection is established===>", socket.id);
  //Event listeners
  socket.on("room-joined", (data) => {
    console.log("room-joined==>", data);
    socket.join(data.roomId);
    socket.to(data.roomId).emit("new-user-joined", data);
  });

  socket.on("send", (data) => {
    socket.to(data.roomId).emit("receive", data);
  });

  socket.on("disconnect", () => {
    console.log("socket disconnected==>", socket.id);
  });
});

//Listening server of port
server.listen(8000, () => {
  console.log("Listening on", 8000, "port");
});
