/**
 * Напиши функцию, которая разделяет массив на части заданного размера.
 */
const chunk = (array, size) => {
  const newArr = [];
  for (let i = 0; i < array.length; i += size) {
    let element = array.slice(i, i + size);
    newArr.push(element);
  }
  return newArr;
};

console.log(chunk([1, 2, 3, 4, 5, 6, 7], 2)); // [[1, 2], [3, 4], [5, 6], [7]]
console.log(chunk([1, 2, 3, 4, 5, 6, 7], 3)); // [[1, 2, 3], [4, 5, 6], [7]]

//создаём пустой массив
//начинаем проходить данный нам массив
//добавляем каждые элементы от прохода size в новый массив при помощи slice;