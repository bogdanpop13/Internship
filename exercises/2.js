const num1 = 1234321;
const isPalindrome = (num) => {
    let str = num.toString();
    let len = str.length
    len = Math.floor(len)
    for (let i=0;i<=len/2-1;i++) {
        if (str[i] !== str[len-i-1])
            return false;
    }
    return true;
}
console.log(isPalindrome(num1))