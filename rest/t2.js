/**
 * На вход функции подаётся массив, который в свою очередь содержит другие массивы,
 * необходимо реализовать функцию intersection так,
 * чтобы она создавала массив из уникальных значений,
 * которые есть в каждом из вложенных массивов
 */
const intersection = arrays => {
  const result = [];
  const [first, ...rest] = arrays;
  for (let arrs of rest) {
    for (let item of arrs) {
    for (let itemOfFirstArr of first) {
      if (item === itemOfFirstArr) {
        result.push(item);
      }
    }
  } 
  uniqueArr = [...new Set(result)]
  }
  return uniqueArr;
};

console.log(
  intersection([
    [1, 2],
    [2, 3],
  ])
); // [2]
console.log(
  intersection([
    ['a', 'b'],
    ['b', 'c'],
    ['b', 'e', 'c'],
  ])
); // ['b']
console.log(
  intersection([
    ['b', 'b', 'e'],
    ['b', 'c', 'e'],
    ['b', 'e', 'c'],
  ])
); // ['b', 'e']

