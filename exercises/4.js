const arr = [1, 3, 5, 4, 2];
const sortedArr = (arr) => {
    let len = arr.length;
    let aux = 0;
    for (let i=0;i<len-1;i++) {
        for (let j=i+1;j<len;j++) {
            if (arr[i] > arr[j]) {
                aux = arr[j];
                arr[j] = arr[i];
                arr[i] = aux;
            }
        }
    }
    return arr;
}
console.log(sortedArr(arr));