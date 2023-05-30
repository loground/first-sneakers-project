const negativeNumberCheck = (arr) => {
  if (arr.length === 0) {
  return null;
  }
  
  for (const num of arr) {
    if (num < 0) {
    return false;
    }
  }
  
return true;
};

console.log(negativeNumberCheck([1, 2, 3, -14]))