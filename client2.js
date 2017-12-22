const request = require('request-promise');
const Bottleneck = require('bottleneck');

const maxConcurrent = 2;
const delay = 500;
const maxQueue = 3;
const strategy = Bottleneck.strategy.OVERFLOW;

const limiter = new Bottleneck(maxConcurrent, delay, maxQueue, strategy);

function getComment(id) {
  console.log(`call ${id}`);
  return limiter.schedule(() => {
    console.log(`request ${id}`);
    return request({
      uri: `https://jsonplaceholder.typicode.com/comments/${id}`,
      json: true
    });
  }, id);
}

limiter.on('dropped', dropped => console.log(`drop ${dropped.args[0]}`));

module.exports = { getComment };
