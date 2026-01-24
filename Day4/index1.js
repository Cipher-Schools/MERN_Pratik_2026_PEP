var name = "Masai School"; //using double quotes
var subject = "Coding"; // using single quotes
var val = `Hi`; //  using template literal

let firstname = "Pratik";
let lastname = "Raj";

let fullname = firstname + " " + lastname;
console.log(fullname);

let fullName1 = `${firstname} ${lastname}`;
console.log(fullName1);

//Numbers

let ans = 20;
let ans1 = 20.99999;
console.log(typeof ans, typeof ans1);

// Array-discuss all methods like push ,pop,shift,unshift,slice,splice,includes,index of

let arr = [1, 2, 3, "pratik", null, Boolean, { name: "Raj" }];

//  arr.pop();
//   arr.pop();
// console.log(arr);

// let value=20;
// let result=arr.unshift()
// console.log(result);

//Objects

let object = {
  name: "Pratik",
  email: "kpr@gmail.com",
  age: 28,
  city: "Patna",
};

console.log(object, typeof object);
console.log(object.city);

object.email = "pkr@gmail.com";
console.log(object);

object["skill"] = "coding";
console.log(object);

let value = "skill";
console.log(object[value]);

//Q1. Write a function named reverseString that takes a string as an argument
//  and returns the reverse of that string. Do not use any built-in reverse methods.

//   REACTO---->

// R-READING
// E-EXPLANATION
// A-APPROACH
// C-CODE
// T-IMECOMPLEXITY
//O-OPTIMIZATION

//Write a function named sumArray that takes an array of numbers as an
//  argument and returns the sum of all the numbers in the array.

//Write a function named findMax that takes an array of numbers as an
//  argument and returns the largest number in the array.

let a;
console.log(a, typeof a); //undefined

let b = null;
console.log(b, typeof b);

let obj = { name: "john" };

console.log(obj, typeof obj);

//Note:- There are 6 falsey values in Js

// 1. null,undefined,"",false,NaN,0

console.log(!null);

//Write a JavaScript function that checks if a variable is undefined.
//  The function should return true if the variable is undefined, and false otherwise.

function CheckVal(value) {
  if (value && typeof value === "object") {
    console.log("This is an object");
  } else {
    console.log("This is not an object");
  }
}

let newValue = CheckVal(b); //
console.log(newValue);

let ans2=5>3
console.log( ans2,"is an expression");

//Write a JavaScript function that checks if a variable is null.
//  The function should return true if the variable is null, and false otherwise.


//Write a function that takes a value as an argument and
//  returns true if the value is truthy and false if the value is falsy.