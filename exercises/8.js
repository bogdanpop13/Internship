const num = 942;
function digitsSum (num) {
    let sum = 0;
    while (num > 0) {
        sum += num % 10;
        num = Math.floor(num/10);
    }
    if (sum < 10)
        return sum;
    return digitsSum(sum);
}
console.log(digitsSum(num))