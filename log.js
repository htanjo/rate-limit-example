const Table = require('cli-table');
const logUpdate = require('log-update');
const storedItems = [];

function updateItems(items, id, status) {
  const foundItem = items.find(item => item.id === id);
  if (foundItem) {
    foundItem.status = status;
  } else {
    items.push({ id, status });
  }
  return items;
}

function render(items) {
  const table = new Table({
    head: ['#', 'Status'],
    colWidths: [3, 16]
  });
  table.push(...items.map(item => [item.id, item.status]));
  logUpdate(table.toString());
}

module.exports = (id, status) => {
  updateItems(storedItems, id, status);
  render(storedItems);
};
