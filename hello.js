//js
//CopyEdit
//hello.js
console.log("Hello, Zero2Stack!");

import readline from "readline";
 const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
 rl.question("What's your name?", name=> {
 console.log(`Hello, ${name}! Welcome to Zero2Stack.`);
 rl.close();
 })