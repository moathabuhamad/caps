'use strict';

require('dotenv').config();
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;

const io = require('socket.io-client');
const capsNameSpace = io.connect(`http://${host}:${port}/caps`);

capsNameSpace.on('pickup', order => onPickup(order));

function onPickup(order) {
  setTimeout(() => {
    console.log(`DRIVER: picked up ${order.orderID}`);
    capsNameSpace.emit('in-transit', order);
  }, 1000);
  setTimeout(() => {
    console.log(`DRIVER: delivered ${order.orderID}`);
    capsNameSpace.emit('delivered', order);
  }, 3000);

}

module.exports.onPickup = onPickup;