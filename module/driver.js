"use strict";

const events = require("../events");

events.on("pickup", (payload) => payloadDelivery(payload));

function payloadDelivery(payload) {
  setTimeout(() => {
    payloadPickup(payload);
  }, 2000);
  setTimeout(() => {
    payloadDel(payload);
  }, 4000);
}
function payloadPickup(payload) {
  console.log(`DRIVER : picked up ${payload.fakeId}`);
  events.emit("in-transit", payload);
}
function payloadDel(payload) {
  console.log(`DRIVER: deliverd up ${payload.fakeId}`);
  events.emit("delivered", payload);
}
module.exports = {
  payloadDelivery: payloadDelivery,
  payloadPickup: payloadPickup,
  payloadDel: payloadDel,
};
