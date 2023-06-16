const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const morgan = require("morgan");
const cors = require("cors");

// Using Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

//Routes
app.get("/", (req, res) => {
  res.send("Welcome to home page");
});

//Listening server of port
app.listen(8000, () => {
  console.log("Listening on", 8000, "port");
});
