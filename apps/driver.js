"use strict";

const io = require("socket.io-client");
const host = "http://localhost:3000";
const cspsConnection = io.connect(host);
let orderInfo;
cspsConnection.on("sendInfo", (payload) => {
  orderInfo = payload.orderInfo;
  cspsConnection.on("in-transit", () => {
    console.log(new Date(), `: picked up order ${orderInfo.orderID}`);
  });
  cspsConnection.emit("in-transit", {
    event: "in-transit",
    time: new Date(),
    payload: orderInfo,
  });
  cspsConnection.on("delivered", () => {
    console.log(new Date(), `: delivered order ${orderInfo.orderID}`);
  });
  cspsConnection.emit("delivered", {
    event: "delivered",
    time: new Date(),
    payload: orderInfo,
  });
});
