let a = 20;
console.log(a);
let b = a;
console.log(b);
b = 30;
console.log(b);
console.log(a);

let arr = [1, 2, 3, 4, 5];
let arr1 = arr;
console.log(arr);
console.log(arr1);
arr1.push(10);
console.log(arr1);
console.log(arr);

//Arrow functions

// function greet(name) {
//   return `Greeting from ${name}`;
// }
// console.log(greet("Pratik"));

let  greet =name=> `Greeting from ${name}`;

console.log(greet("Pratik"));

//Q1.Write a JavaScript function named findEvenNumbers
//  that takes in an array of numbers as a parameter and returns a new array containing only the even numbers from the original array.


let findEven = (arr)=>{
    let y = [];
    for(let i = 0; i < arr.length; i++){
        if(arr[i] % 2 == 0){
            y.push(arr[i]);
        }
    }

    console.log(y);
}

let brr = [1, 2, 3, 4, 5]
findEven(brr);


//Spread

let user = {
  firstName: "John",
  lastName: "Doe",
};

let {firstName,lastName}=user
console.log(`${firstName} ${lastName}`);


let arr2 = [1, 2, 3, 4, 5]

let arr3=[6,7,8]
let array=[...arr2,...arr3]

console.log(array);

let [one,two,three,]=arr3

console.log(one,two,three);



let person={
  name:"Pk",
  age:28,
  city:"Kolkata",
  profile:[{designation:"software engineer",degree:"B.Tech"},{role:"Frontend developer"}]
}


let {profile}=person

let [obj1,obj2]=profile

let {designation,degree }=obj1



console.log(degree)


