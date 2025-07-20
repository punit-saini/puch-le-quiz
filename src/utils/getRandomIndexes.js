export function getRandomIndexes(count, max) {
  const indexes = new Set();
  while (indexes.size < count) {
    indexes.add(Math.floor(Math.random() * max));
  }
  return [...indexes];
}
