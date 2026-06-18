// console.log("A");
// console.log("B");

// for (let i = 0; i < 1000000000; i++) {
//   if ((i === 9999999)) {
//     console.log("I am taking longer time");
//   }
// }
// console.log("C");

// console.log("A");
// setTimeout(() => {
//   console.log("B");
// },0);
// console.log("C");

// while (true) {
//   // Infinite loop (blocks program)
//   console.log("I am of blocking nature");
// }
// console.log("Hello");

async function fetchUser() {
  try {
    let res = await fetch("https://jsonplaceholder.typicode.com/products/1");
    let data = await res.json();
    console.log(data);
  } catch (error) {
    console.log("Failed to fetch user:", error);
  }
}

fetchUser();
