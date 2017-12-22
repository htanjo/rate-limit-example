const { getComment } = require('./example-bottleneck');
const log = require('./log');

const ids = [1, 2, 'x', 4, 5, 6, 7, 8];

Promise.all(ids.map(id => {
  return getComment(id)
    .then(() => log(id, 'ok'))
    .catch(() => log(id, 'error'));
}));
