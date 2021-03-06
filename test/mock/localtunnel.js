'use strict';

const EventEmitter = require('events');
const sinon = require('sinon');

module.exports = sinon.spy(function() {
  const tunnel = {
    url: 'http://localhost.localtunnel'
  };
  const tunnelEvents = new EventEmitter();
  
  const mock = sinon.spy((port, opts, cb) => {
    if (arguments.length === 2) {
      cb = opts;
    }
    cb(mock.err, tunnel);
    return tunnelEvents;
  });
  
  mock.tunnel = tunnel;
  mock.tunnelEvents = tunnelEvents;
  mock.err = null;
  
  return mock;
});