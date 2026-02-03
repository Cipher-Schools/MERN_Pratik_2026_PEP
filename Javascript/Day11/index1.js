// function addItems() {
//   let input = document.getElementById("inputList");
//   //   console.log(input);
//   let item = input.value;
//   //   console.log(item);
//   let list = document.getElementById("list");
//   let li = document.createElement("li");
//   li.innerText = item;
//   list.appendChild(li);
// }
// function removeItems(){
//     list.innerHTML=""
// }

//Local storage methods:-
// setItem(), getItem(), removeItem(), and clear().

// let value = localStorage.setItem("fruit", "Apple");
// console.log(value);
// localStorage.setItem("fruit", "Apple");
// let value = localStorage.getItem("fruit");
// console.log(value);
// localStorage.removeItem("fruit");

// let obj = { name: "Pratik", age: 28, city: "Patna" };
// console.log(obj);

// localStorage.setItem("obj", JSON.stringify(obj));

// // console.log(localStorage.setItem("obj", JSON.stringify(obj)));
// console.log(JSON.stringify(obj));

// let data = localStorage.getItem("obj");

// console.log(JSON.parse(data));

function addTodo() {
  let input = document.getElementById("inputList").value;

  if (localStorage.getItem("todos") === null) {
    localStorage.setItem("todos", JSON.stringify([]));
  }
  let todos = JSON.parse(localStorage.getItem("todos"));
  todos.push(input);
  localStorage.setItem("todos", JSON.stringify(todos));

  displayTodo();
}

function displayTodo() {
  const list = document.getElementById("list");
  const todos = JSON.parse(localStorage.getItem("todos"));

  list.innerHTML = "";
  todos.forEach((value) => {
    const li = document.createElement("li");
    li.innerText = value;
    list.appendChild(li);
  });
}

function removeTodo() {
  localStorage.removeItem("todos");
  displayTodo();
}

displayTodo();
