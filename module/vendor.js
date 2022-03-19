"use strict";

const events = require("../events");
const { faker } = require("@faker-js/faker");

function createOrder() {
  let fakeStore = "LTUC";
  let fakeId = faker.datatype.uuid();
  let fakeCustomer = faker.name.findName();
  let fakeAddress = `${faker.address.city()},${faker.address.streetAddress()}`;
  let fakeOrder = {
    fakeStore: fakeStore,
    fakeId: fakeId,
    fakeCustomer: fakeCustomer,
    fakeAddress: fakeAddress,
  };
  return fakeOrder;
}

let payloadData = createOrder();

function pickUp(fakeOrder = payloadData) {
  events.emit("pickup", fakeOrder);
}
setInterval(pickUp, 6000);

events.on("delivered", makeDelivery);
function makeDelivery(payload) {
  console.log(`Thank you, ${payload.fakeId}`);
}
module.exports = { createOrder, pickUp, makeDelivery };
