const squareSumOfNums = (arr) => {
    let sum = 0;

    for (let i = 0; i < arr.length; i++){
        if (arr[i] > 0){
        let square = arr[i] * arr[i];
        sum += square;
        }
    }
    console.log(sum);
return sum;
}

console.log(squareSumOfNums([4, 1, 5, 2, 5]));
