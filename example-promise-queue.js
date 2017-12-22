const request = require('request-promise');
const Queue = require('promise-queue');
const log = require('./log');

const maxConcurrent = 1;
const maxQueue = 5;
const timeout = 500;

const queue = new Queue(maxConcurrent, maxQueue);

function getComment(id) {
  log(id, 'added');
  const isReady = queue.getPendingLength() < maxConcurrent;
  const prepare = () => isReady ? Promise.resolve() : delay(timeout);
  return queue.add(() => {
    return prepare()
      .then(() => {
        log(id, 'requesting');
        return request({
          uri: `https://jsonplaceholder.typicode.com/comments/${id}`,
          json: true
        });
      });
  });
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = { getComment };
