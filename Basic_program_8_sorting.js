//basic sorting
let fruits =["banana", "apple", "orange", "mango", "grape"];
fruits.sort();
console.log("Sorted fruits:", fruits);

//descending order
fruits.reverse();
console.log("Fruits in descending order:", fruits);

//number sorting
let numbers =[34, 12, 5, 78, 23, 90];
numbers.sort();
console.log("Sorted numbers:", numbers);
numbers.sort(function(a, b){return a - b;});
console.log("Numbers in ascending order:", numbers);

//descending order for numbers
numbers.reverse();
console.log("Numbers in desending order:", numbers);
//numbers.reverse(function(a, b){return b - a;});
//console.log("Numbers in descending order:", numbers);