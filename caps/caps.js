'use strict';

require('dotenv').config();
const port = process.env.PORT || 3000;

const io = require('socket.io')(port);
const capsNameSpace = io.of('/caps');

capsNameSpace.on('connection', socket => {
  console.log('Connected to socket', socket.id);

  socket.on('join', room => socket.join(room));

  socket.on('pickup', eventHandler('pickup'));
  socket.on('in-transit', eventHandler('in-transit'));
  socket.on('delivered', eventHandler('delivered'));
});

function eventHandler(event) {
  return payload => {
    if (event !== 'pickup') {
      capsNameSpace.to(payload.store);
    }

    capsNameSpace.emit(event, payload);

    console.log('Event', {
      event,
      time: new Date().toLocaleTimeString(),
      payload,
    });
  };
}

module.exports.eventHandler = eventHandler;