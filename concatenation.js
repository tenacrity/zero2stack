let n1=10;
n2=20;
let res=n1+n2;
console.log(res);
console.log("addition of two numbers is "+res);
console.log(n1+"+"+n2+"="+res);
console.log(`${n1}+${n2}=${res}`);


let n;
n+5+"3";
console.log(n,typeof n);
n=5*"3";
console.log(n,typeof n);
n=5+"hi";
console.log(n,typeof n);
n=5*"H";
console.log(n,typeof n);

let a1=Number("5");//Explict conversion
let a2=Number("3");
let r=a1+a2;
console.log(r);
console.log(5*"3");//Implicit conversion