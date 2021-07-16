const { getCityBikeData } = require("../controller/citybike");

class Sockets {
  constructor(io) {
    this.io = io;
    this.socketEvents();
  }

  socketEvents() {
    //On connection
    this.io.on("connection", async (socket) => {
      var socketId = socket.id;
      var clientIp = socket.request.connection.remoteAddress;
      console.log("New connection " + socketId + " from " + clientIp);
      socket.emit("load-info", await getCityBikeData());
      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
    });

    setInterval(async () => {
      this.io.volatile.emit("load-info-new", await getCityBikeData());
    }, 15000);
  }
}

module.exports = Sockets;
