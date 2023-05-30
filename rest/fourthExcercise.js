const arrInsideOfArr = (arr) => {
    const newArr = [];
    for (let i = 0; i < arr.length; i++){
       if (Array.isArray(arr[i])) {
       newArr.push(arr[i]);
    };
}
return newArr;
}

console.log(arrInsideOfArr([2, 4, [4, 4], [1, 5]]));