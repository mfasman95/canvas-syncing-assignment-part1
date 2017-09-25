// Disabling full file because linter is not required on client side
/* eslint-disable */
'use strict';

var socket = void 0;
var SERVER_LOCATION = 'localhost:3000';
var updatableTimer = document.querySelector('#updatableTimer');
var updatableCounter = document.querySelector('#updatableCounter');
var counterIncrementer = document.querySelector('#counterIncrement');

var counter = 0;

var socketHandlers = Object.freeze({
  updateTimer: function updateTimer(data) {
    return updatableTimer.innerHTML = 'Timer: ' + data.timer;
  },
  updateCounter: function updateCounter(data) {
    console.log(data);
    counter = data.counter;
    updatableCounter.innerHTML = 'Counter: ' + counter;
  }
});

var emitter = function emitter(obj) {
  return socket.emit('clientEmit', obj);
};

window.onload = function () {
  console.log('Connecting to server at ' + SERVER_LOCATION + '...');
  socket = io(SERVER_LOCATION);
  socket.on('connect', function () {
    console.log('Socket connected at ' + SERVER_LOCATION + '...');
    socket.emit('test', { data: 'test' });
    emitter({ eventName: 'test', data: { test: 'test' } });
  });
  socket.on('serverMsg', function (data) {
    if (socketHandlers[data.eventName]) return socketHandlers[data.eventName](data.data);else console.warn('Missing event handler for ' + data.eventName + '!');
  });

  counterIncrementer.onclick = function () {
    console.log('CLICKED');
    socket.emit('test', { test: 'SOME DATA' });
    emitter({ eventName: 'incrementCounter', data: {} });
  };
};
