const request = require('request-promise');
const { RateLimiter } = require('limiter');
const limiter = new RateLimiter(2, 'second');

function getComment(id) {
  console.log(`call ${id}`);
  return new Promise((resolve, reject) => {
    limiter.removeTokens(1, (err, remainingRequests) => {
      console.log(`request ${id}`);
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
