let user = {
  firstName: "Vivek",
  lastName: "Agarwal",
  age: 38,
  posts: [
    { title: "Post 1", comments: 10 },
    { title: "Post 2", comments: 11 },
  ],
};

const user1 = {
  id: 339,
  name: "John",
  age: 42,
  subjects: ["HTML", "CSS", "Javascript"],
  education: {
    degree: {
      name: "BCA",
    },
  },
};

// console.log(degreeName);  //BCA

// Q1.Write a function that takes an array as input and destructures
//  it to return the first and last elements of the array.

function greet(name,...rest){
return ` Hi, I am ${name},${rest} ` 
}
// let ans=Greet("Pratik","cricket","music")
let arr = ["vivek","hobbies","music"]
let ans = greet(arr);
console.log(ans);

let user2 = {
  name: "Tristan",
  age: 20,
  course: "btech-IT",
  minor: "full-stack"

};
let {age,...ruser}=user2;
console.log(ruser);

const person = {
  name: "John",
  address: {
    city: "New York",
    street: "123 Main St",
  },
};

console.log(person?.addres?.city); //optional chaining

//Write a function in JavaScript that uses optional chaining to safely access the age property of a given person object.
 //If the age property is present, return its value; otherwise, return a default value of 0.


  //Implement a function in JavaScript that uses optional chaining to safely access the price property of a given product object. 
//If the price property is present, apply a discount of 10% and return the discounted price as a string with two decimal places.

let product={
  name:"xyz",
  brand:"abc",
  price:20.45
}

function discount(product){
    let price=product?.price;
    if(price){
      return String(price-(price*0.1).toFixed(2));
    }
}

console.log(discount(product))