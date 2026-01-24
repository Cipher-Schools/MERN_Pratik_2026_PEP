var firstname;
//   console.log(firstname);

firstname = "Pratik";
//   console.log(firstname);

firstname = "Raj";
//   console.log(firstname);

var firstname = "Pandey";
console.log(firstname);

let val;
console.log(val);
val = 20;
console.log(val);
val = 39;
console.log(val);

//   let val-->Redeclaration is not possible with let

const ans = [1, 2, 3, 4];
console.log(ans);

// Q. Write a JavaScript function to calculate the area of a rectangle. The function should take two parameters,
// width and height, and return the calculated area.

let a = 20,
  b = 20;

function calculateArea(a, b) {
  let area = a * b;
  console.log(area);
}
calculateArea(a, b);

//Q.2  Write a JavaScript function to check if a given number is even or odd. The function should take one parameter,
//  num, and return "Even" if the number is even, and "Odd" if the number is odd.

//Q3. Write a JavaScript function that takes an array of numbers and returns the sum of all
// the numbers in the array. The function should take one parameter, numbers, which is an array of numbers, and return the calculated sum.

//Q4. Write a JavaScript function that takes a variable x as an argument and returns its type.
//  Do not use any built-in functions or methods to determine the type.

//Q5. Write a JavaScript function that takes an array as an argument and returns a new array with the same elements,
//  but with each element's type converted to a string.
//  For example, if the input array is [1, "hello", true], the output should be ["number", "string", "boolean"].
function typechange(arr) {
  let arr2 = [];
  for (let i = 0; i < arr.length; i++) {
    arr2.push(typeof arr[i]);
  }
  return arr2;
}
arr = [1, "hello", true];
console.log(typechange(arr));

//Q6. Write a JavaScript function that takes a variable x as an argument and checks if its type is "object". 
// The function should return true if the type is "object", and false otherwise.
