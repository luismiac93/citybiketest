const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const Sockets = require("./sockets");

const index = require("../routes/index");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 4001;

    //http server
    this.server = http.createServer(this.app);
    //configuraciones de sockets
    this.io = socketIo(this.server);
  }

  middlewares() {
    this.app.use(index);
  }

  configurarSockets() {
    new Sockets(this.io);
  }

  execute() {
    //call the middlewares
    this.middlewares();

    //configurar sockets
    this.configurarSockets();

    this.server.listen(this.port, () =>
      console.log(`Listening on port ${this.port}`)
    );
  }
}

module.exports = Server;
