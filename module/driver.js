"use strict";

const events = require("../events");

events.on("pickup", (payload) => payloadDelivery(payload));

function payloadDelivery(payload) {
  setTimeout(() => {
    payloadPickup(payload);
  }, 2000);
  setTimeout(() => {
    payloadDelivery(payload);
  }, 4000);
}
function payloadPickup(payload) {
  console.log(`DRIVER : picked up ${payload.fakeID}`);
  events.emit("in-transit", payload);
}
function payloadDelivery(payload) {
  console.log(`DRIVER: deliverd up ${payload.fakeID}`);
  events.emit("delivered", payload);
}
module.exports = {
  payloadDelivery: payloadDelivery,
  payloadPickup: payloadPickup,
  payloadDelivery: payloadDelivery,
};
