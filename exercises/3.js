const num = 9;

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

const isSuperPalindrome = (num) => {
    let root = Math.sqrt(num);
    if (!isPalindrome(num) || root !== Math.floor(root) || !isPalindrome(Math.floor(root))) {
        return false;
    } else {
        return true;
    }
}

console.log(isSuperPalindrome(num))