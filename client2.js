const request = require('request-promise');
const Bottleneck = require('bottleneck');
const log = require('./log');

const maxConcurrent = 1;
const delay = 500;
const maxQueue = 5;
const strategy = Bottleneck.strategy.OVERFLOW;
const rejectOnDrop = true;

const limiter = new Bottleneck(maxConcurrent, delay, maxQueue, strategy, rejectOnDrop);

function getComment(id) {
  log(id, 'added');
  return limiter.schedule(() => {
    log(id, 'requesting');
    return request({
      uri: `https://jsonplaceholder.typicode.com/comments/${id}`,
      json: true
    });
  });
}

module.exports = { getComment };
