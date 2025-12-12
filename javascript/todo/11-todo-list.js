allTasks = JSON.parse(localStorage.getItem("allTasks")) || [];
renderToDoList();

function renderToDoList() {
  let todoListHTML = ``;
  allTasks.forEach((todoObject, index) => {
    const { name, dueDate } = todoObject;
    const html = `
          <div> ${name}</div>
          <div>${dueDate}</div>
          <div>
            <button
            class="delete-todo-button" onclick="allTasks.splice(${index}, 1);
            renderToDoList(); 
             "
            >Delete</button>
          </div>
           `; //this deletes the task
    todoListHTML += html;
  });
  document.querySelector(".tasks-container").innerHTML = todoListHTML;
}

function addToDo() {
  const secondInputField = document.getElementById("todo-second");
  const dateInputElement = document.getElementById("calendar");
  const dueDate = dateInputElement.value;
  const name = secondInputField.value;
  allTasks.push({ name: name, dueDate: dueDate }); //name, dueDate <- shorthand property syntax
  localStorage.setItem("allTasks", JSON.stringify(allTasks));
  secondInputField.value = "";
  renderToDoList();
}
