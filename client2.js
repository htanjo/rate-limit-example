const request = require('request-promise');
const Bottleneck = require('bottleneck');
const log = require('./log');

const maxConcurrent = 1;
const delay = 500;
const maxQueue = 5;
const strategy = Bottleneck.strategy.OVERFLOW;

const limiter = new Bottleneck(maxConcurrent, delay, maxQueue, strategy);

function getComment(id) {
  log(id, 'added');
  return limiter.schedule(() => {
    log(id, 'requesting');
    return request({
      uri: `https://jsonplaceholder.typicode.com/comments/${id}`,
      json: true
    });
  }, id);
}

limiter.on('dropped', dropped => log(dropped.args[0], 'dropped'));

module.exports = { getComment };
