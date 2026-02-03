// let container = document.getElementById("container");

// async function fetchData() {
//   try {
//     container.innerHTML = "<h2>Loading data...</h2>";
//     const response = await fetch("https://jsonplaceholder.typicode.com/users");
//     if (!response.ok) {
//       throw new Error("Error while fetching data");
//     }
//     let data = await response.json();
//     console.log(data);
//     data.forEach((element) => {
//       container.innerHTML += `<li>${element.name} </li>`;
//     });
//   } catch (error) {
//     console.log("Failed to fetch data");
//   }
//   // const response = await fetch("https://jsonplaceholder.typicode.com/users");
//   // container.innerHTML = "";
//   // let data = await response.json();
//   // data.forEach((element) => {
//   //   container.innerHTML += `<li>${element.name} </li>`;
//   // });
//   // console.log(data);
// }
// fetchData();

const user = {
  name: "Alice",
  age: 25,
  isMember: true,
};

const jsonString = JSON.stringify(user);
console.log(jsonString);
