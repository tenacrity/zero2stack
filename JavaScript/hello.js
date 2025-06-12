 import readline from "readline";
  console.log('Hello! Zero2Stack');
 const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
 rl.question("What's your name? ", name => {console.log(`Hello, ${name}! Welcome to Zero2Stack.`);
 rl.close();
 });