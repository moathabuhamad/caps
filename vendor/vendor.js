'use strict';

require('dotenv').config();
const io = require('socket.io-client');
const faker = require('faker');
const storeName = process.env.STORE_NAME || 'Cacti Store';

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;

const capsNameSpace = io.connect(`http://${host}:${port}/caps`);

capsNameSpace.emit('join', storeName);
capsNameSpace.on('delivered', payload => {
    console.log(`VENDOR: Thank you for delivering ${payload.orderID}`);
});

function start() {
    setInterval(() => {
        const fakeOrder = {
          store: storeName,
          orderID: faker.random.uuid(),
          customer: faker.fake('{{name.firstName}} {{name.lastName}}'),
          address: faker.address.streetAddress(),
        };
        capsNameSpace.emit('pickup', fakeOrder);
      }, 5000);
}

start();

module.exports = { start: () => start() };