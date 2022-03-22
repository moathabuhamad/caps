'use strict';

const express = require('express');
const app = express();
require('dotenv').config();

const io = require('socket.io-client');
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

app.listen(3001, () => console.log(`listen on 3001`));