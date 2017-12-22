const { getComment } = require('./client2');

const ids = [1, 2, 'x', 4, 5, 6, 7, 8, 9, 10];

Promise.all(ids.map(id => {
  return getComment(id)
    .then(() => console.log(`ok ${id}`))
    .catch(() => console.log(`ng ${id}`));
}));
