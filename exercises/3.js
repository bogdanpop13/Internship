const num = 9;

const isPalindrome = (num) => {
  const str = num.toString();
  const len = str.length;

  for (let i = 0; i <= len / 2 - 1; i++) {
    if (str[i] !== str[len - i - 1]) return false;
  }

  return true;
};

const isSuperPalindrome = (num) => {
  const root = Math.sqrt(num);
  const floorRoot = Math.floor(root);

  if (!isPalindrome(num) || root !== floorRoot || !isPalindrome(floorRoot)) {
    return false;
  }

  return true;
};

console.log(isSuperPalindrome(num));
