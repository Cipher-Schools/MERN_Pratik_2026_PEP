let a = {},
  b = "pk",
  c = NaN;
let z = a || b || c;
console.log(z);

let ans = 0 || "" || NaN;
console.log(ans);

// Q1.  let res = (null && "A") || ("" || (5 && "Hi"));

//Q2.let res = !("" || 0) && (NaN || "JS");

let res = !("" || 0) && (NaN || "JS");
console.log(res);

//Q3. let res = (undefined || ("" && 5)) || (NaN && "OK") || "Final";

//Q4.Write a function named isTruthy that takes in three boolean arguments a, b, and c.
// The function should return true if at least one of the arguments is truthy, and false otherwise.

let x = "120px";
console.log(parseInt(x));

//Q5.true+false

//Q6.10*"abc"

function CheckValue(val) {
  if (Array.isArray(val)) {
    return "This is an array";
  } else if (val && typeof val === "object") {
    return "This is an object";
  } else if (typeof val === "object") {
    return "This is null";
  } else {
    return typeof val;
  }
}
let value = {};
let result = CheckValue(val);
