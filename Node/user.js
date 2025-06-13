// calculator.js

import readline from "readline";
import { add, multiply } from "./math.js";

// Set up input from the command line
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Ask the user for two numbers
rl.question("Enter two numbers separated by space: ", (input) => {
  const [a, b] = input.split(" ").map(Number);

  console.log("Sum:", add(a, b));
  console.log("Product:", multiply(a, b));

  rl.close();
});
