/**
 * На вход функции подаётся массив,
 * в котором находятся числа и другие массивы (в которых так же могут находиться и массивы и числа, и так далее).
 * Тебе необходимо "развернуть", все эти массивы в один "плоский" массив, содержащий только числа
 * Порядок чисел в результирующем массиве не важен
 */

const flatArray = nestedArray => {
  let result = []; //создаём пустой массив
  for (let i = 0; i < nestedArray.length; i++) { //проходим по массиву
    let item = nestedArray[i]; //создаём переменную item, которая равна элементу массива от i
    if (Array.isArray(item)) { //если item это массив, то
      result = result.concat(flatArray(item)); //пустой массив result соединяется с развёрнутым массивом айтем.
    } else {
      result.push(item); //если item не массив, то просто добавляем его в result.
    }
  }
    return result; //возвращаем result.
};


console.log(flatArray([1, [7, 3], [4, 2]])); // [1, 7, 3, 4, 2]
console.log(flatArray([[[[[1]]]]])); // [1]
console.log(flatArray([[3, 4, 5, [2, 1], [8]], [0], [11], [67]])); // [3, 4, 5, 2, 1, 8, 0, 11, 67]
console.log(flatArray([1, [], [[3], 4], [2], [[0]]])); // [1, 3, 4, 2, 0]


//ver 2.0
//const flatArray = nestedArray => {
//let newArr = nestedArray.flat(Infinity);
//return newArr;
//};

//ver destructurized;
//const flatArray = (nestedArray) => {
  //const [first, ...rest] = nestedArray;
  //if (first === undefined) {
    //return [];
  //} else if (Array.isArray(first)) {
    //return flatArray([...first, ...rest]);
  //} else {
    //return [first, ...flatArray(rest)];
  //}
//};
