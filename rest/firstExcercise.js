const negativeNumber = (arr) => {
    const newArr = [];

    for (const nume of arr){
        if (nume < 0){
            newArr.push(nume);
        }
    }
return newArr;
}

console.log(negativeNumber([1,2,-3,4]))