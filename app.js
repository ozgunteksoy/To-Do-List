// selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

//function
todoButton.addEventListener("click", function addTodo(e) {
  e.preventDefault();

  //events
  document.addEventListener("DOMContentLoad", function () {
    getToDos();
  });
  const alertWarning = document.querySelector(".alert-warning");
  const alertSuccess = document.querySelector(".alert-success");

  const isEmpty = (str) => !str.trim().length; // Yazıda boşluk var mı
  if (isEmpty(todoInput.value)) {
    alertWarning.style.display = "block";
    setTimeout(() => {
      alertWarning.style.display = "none";
    }, 1000);
  } else {
    alertSuccess.style.display = "block";
    setTimeout(() => {
      alertSuccess.style.display = "none";
    }, 1000);

    saveToDos(todoInput.value);

    // Clear input value
    todoInput.value = "";
  }
});

todoList.addEventListener("click", function deleteCheck(e) {
  const item = e.target; // .list'in içinde tıklandığı yer tanır

  // delete .todo
  if (item.classList[0] === "delete-btn") {
    const todo = item.parentElement; // tıkladığımızda 0. eleman silme butonu class'ı içeriyorsa
    todo.classList.add("fall");
    removeLocalStorage(todo);
    todo.addEventListener("transitionend", function () //animasyon için event
    {
      todo.remove();
    });
  }

  // checked

  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
});

// Local Storage
function saveToDos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getToDos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    Datas = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach((todo) => {
    // create div
    const todoDIv = document.createElement("div");
    todoDIv.classList.add("todo");

    // buttons
    const completedButton = document.createElement("button");
    completedButton.innerHTML = "<i class='fa-solid fa-hand'></i>";
    completedButton.classList.add("complete-btn");
    todoDIv.appendChild(completedButton);

    // todo li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDIv.appendChild(newTodo);

    // delete button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "<i class='fa-solid fa-trash'></i>";
    deleteButton.classList.add("delete-btn");
    todoDIv.appendChild(deleteButton);

    // add to list
    todoList.appendChild(todoDIv);
  });
}

function removeLocalStorage(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[1].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos)); // güncelleme
}
