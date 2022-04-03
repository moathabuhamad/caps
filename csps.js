"use strict";

require("dotenv").config();
const port = process.env.PORT;
const io = require("socket.io")(port);
let orderInfo;

io.on("connection", (socket) => {
  console.log(`connected with ${socket.id}`);

  socket.on("order", () => {
    console.log('starting order event....')
    io.emit('start')

  });
    socket.on("pickup", (payload) => {
      if (payload) {
        orderInfo = payload.payload;
        console.log(payload);
      }
      io.emit("sendInfo", { orderInfo });
    });
    socket.on("in-transit", (payload) => {
      setTimeout(() => {
        io.emit("in-transit");
        if (payload) {
          console.log(payload);
        }
      }, 3000);
    });
    socket.on("delivered", (payload) => {
      setTimeout(() => {
        io.emit("delivered");
        if (payload) {
          console.log(payload);
        }
      }, 6000);
    });
});
