"use strict";

const io = require("socket.io-client");
const { faker } = require("@faker-js/faker");
const host = "http://localhost:3000";
const cspsConnection = io.connect(host);
cspsConnection.on("start", () => {
  const orderInfo = {
    store: faker.company.companyName(),
    orderID: faker.datatype.uuid(),
    customer: faker.name.findName(),
    address: `${faker.address.city()}, ${faker.address.streetAddress()}`,
  };
  cspsConnection.emit("pickup", {
    event: "pickup",
    time: new Date(),
    payload: orderInfo,
  });
  cspsConnection.on("delivered", () => {
    console.log(`thank you for delivering order:${orderInfo.orderID}`);
  });
});
