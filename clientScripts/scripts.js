// Disabling full file because linter is not required on client side
/* eslint-disable */
'use strict';

let socket;
const SERVER_LOCATION = 'localhost:3000';
const updatableTimer = document.querySelector('#updatableTimer');
const updatableCounter = document.querySelector('#updatableCounter');
const counterIncrementer = document.querySelector('#counterIncrement');

let counter = 0;

const socketHandlers = Object.freeze({
  updateTimer: data => updatableTimer.innerHTML = `Timer: ${data.timer}`,
  updateCounter: data => {
    console.log(data);
    counter = data.counter;
    updatableCounter.innerHTML = `Counter: ${counter}`;
  },
});

const emitter = obj => socket.emit('clientEmit', obj);

window.onload = () => {
  console.log(`Connecting to server at ${SERVER_LOCATION}...`)
  socket = io(SERVER_LOCATION);
  socket.on('connect', () => {
    console.log(`Socket connected at ${SERVER_LOCATION}...`);
    socket.emit('test', {data: 'test'});
    emitter({eventName: 'test', data: {test: 'test'}});
  });
  socket.on('serverMsg', (data) => {
     if (socketHandlers[data.eventName]) return socketHandlers[data.eventName](data.data);
     else console.warn(`Missing event handler for ${data.eventName}!`);
  });

  counterIncrementer.onclick = () => {
    console.log('CLICKED');
    socket.emit('test', {test: 'SOME DATA'});
    emitter({ eventName: 'incrementCounter', data: {} });
  }
};
