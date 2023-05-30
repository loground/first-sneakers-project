const howToGetSumOfTen = (arr) => {
    const sumOfTen = 10; 
    let sumZero = 0;
    newArr = [];

    for (let i = arr.length - 1; i >= 0; i--) {
      if (sumZero <= sumOfTen){
      sumZero += arr[i];
      newArr.push(sumZero);
    }
    } 
return newArr.length;
}

console.log(howToGetSumOfTen([2, 4, 6, 7, 2, 3, 5, 2, 3, 1, 5]));