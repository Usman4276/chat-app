const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const morgan = require("morgan");
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

// Using Middlewares
app.use(morgan("dev"));

//Routes
app.get("/", (req, res) => {
  res.send("Welcome to home page");
});

//Listening Socket.io events
io.on("connection", (socket) => {
  console.log(`${socket.id} -- connected`);

  //Event listeners
  socket.on("user-joined", (data) => {
    console.log("Data => ", data);
  });

  socket.on("disconnect", (socket) => {
    console.log("User disconnected...");
  });
});

//Listening server of port
server.listen(8000, () => {
  console.log("Listening on", 8000, "port");
});
