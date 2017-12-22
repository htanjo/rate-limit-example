const request = require('request-promise');
const { RateLimiter } = require('limiter');
const log = require('./log');

const limiter = new RateLimiter(2, 'second');

function getComment(id) {
  log(id, 'added');
  return new Promise((resolve, reject) => {
    limiter.removeTokens(1, (err, remainingRequests) => {
      log(id, 'requesting');
      request({
        uri: `https://jsonplaceholder.typicode.com/comments/${id}`,
        json: true
      })
        .then(resolve)
        .catch(reject);
    });
  });
}

module.exports = { getComment };
