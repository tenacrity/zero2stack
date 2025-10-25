function findElement(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) return i;
        }
        return -1;
}
console.log(findElement([1,3,5,7,9], 5));
console.log(findElement([1,3,5,7,9], 4));