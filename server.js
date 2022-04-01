'use strict';

const express = require('express');
const app = express();
require('dotenv').config();

const socket = require('socket.io');
const port = process.env.PORT || 3000;

const io = socket(port);

const capsNameSpace = io.connect(`http://localhost:3000/caps`);

app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));

app.post('/pickup', (req, res) => {
  capsNameSpace.emit('join', req.body.store);

  capsNameSpace.emit('pickup', req.body);
console.log(req.body);
  res.status(200).json(req.body);
});

capsNameSpace.on('delivered', payload => {
  console.log(`Thank you for delivering ${payload.orderID}`);
});

io.on('connection',(socket2)=>{
  console.log(`Welcome, your socket id is: `,socket2.id);

  socket2.on('hello',(payload)=>{
      console.log('The hub heard the hello event');
      console.log('hello ', payload);
      io.emit('hi');
  });

  socket2.on('bye',payload=>{
      console.log('the server said bye');
  })
});

