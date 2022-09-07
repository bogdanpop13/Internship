const num1 = 1234321;
const isPalindrome = (num) => {
  const str = num.toString();
  const len = str.length;

  for (let i = 0; i <= len / 2 - 1; i++) {
    if (str[i] !== str[len - i - 1]) return false;
  }

  return true;
};
console.log(isPalindrome(num1));
