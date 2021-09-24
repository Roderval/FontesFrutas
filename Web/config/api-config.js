const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const socketIO = require("socket.io");
const cors = require("cors");
const path = require("path");

const dbFunc = require("./db-functions");
const webSocket = require("./websocket");
const SystemRoute = require("../app/routes/system.route");
const AuthRoute = require("../app/routes/authentic.route");

const app = express();
const router = express.Router();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Checking the connection
dbFunc.checkConnection
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.log(err);
    //throw err;
  });

app.use("/api", router);
SystemRoute.init(router);
AuthRoute.init(router);

const server = http.createServer(app);

const apiConfig = {
  app: server
};

const io = socketIO(server);
webSocket.wsServer(io);

// Set static folder
app.use(express.static("client/build"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "client", "build", "index.html"));
});

module.exports = apiConfig;
