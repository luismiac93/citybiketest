const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const { getCityBikeData } = require("./controller/citybike");
const citybikeurl = "http://api.citybik.es/v2/networks/decobike-miami-beach"



const port = process.env.PORT || 4001;
const index = require("./routes/index");
const app = express();


app.use(index);

const server = http.createServer(app);
const io = socketIo(server); // < Interesting!

io.on("connection", async (socket) => {
  var socketId = socket.id;
  var clientIp = socket.request.connection.remoteAddress;
  console.log('New connection ' + socketId + ' from ' + clientIp);
  socket.emit('load-info', await getCityBikeData());
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

setInterval(async () => {
  io.volatile.emit('load-info-new',  await getCityBikeData());
}, 15000);



server.listen(port, () => console.log(`Listening on port ${port}`));



