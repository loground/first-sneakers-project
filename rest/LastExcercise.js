const checkIfBalanced = (arr) => {
    let countOpening = 0;
    let countClosing = 0;
    for (const symbol of arr) {
        if (countOpening < countClosing) {
           return false;
        }
          if (symbol === '(') {
          countOpening++;
        } else if (symbol === ')') {
          countClosing++;
        }
    }
    return countOpening === countClosing;
};

console.log(checkIfBalanced(''));