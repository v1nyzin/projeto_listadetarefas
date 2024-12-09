const form = document.querySelector("#todo-form");
const tasktitleInput = document.querySelector("#task-title-input");
const todoListUl = document.querySelector("#todo-list");

let tasks = [];

function renderTaskOnHTML(taskTitle, done = false) {
  const li = document.createElement("li");

  const input = document.createElement("input");
  input.setAttribute("type", `checkbox`);
  input.addEventListener("change", (event) => {
    const litoToggle = event.target.parentElement;

    const spantoToggle = litoToggle.querySelector("span");

    const done = event.target.checked;
    if (done) {
      spantoToggle.style.textDecoration = "line-through";
    } else {
      spantoToggle.style.textDecoration = "none";
    }

    tasks = tasks.map((t) => {
      if (t.title === spantoToggle.textContent) {
        return {
          title: t.title,
          done: !t.done,
        };
      }
      return t;
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
  });
  input.checked = done;

  const span = document.createElement("span");
  span.textContent = taskTitle;
  if (done) {
    span.style.textDecoration = "line-through";
  }

  const button = document.createElement("button");
  button.textContent = "Remover";
  button.addEventListener("click", (event) => {
    const litoRemove = event.target.parentElement;

    const titletoRemove = litoRemove.querySelector("span").textContent;

    tasks = tasks.filter((t) => t.title !== titletoRemove);

    todoListUl.removeChild(litoRemove);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });

  li.appendChild(input);
  li.appendChild(span);
  li.appendChild(button);

  todoListUl.appendChild(li);
}

window.onload = () => {
  const tasksOnLocalStorage = localStorage.getItem("tasks");

  if (!tasksOnLocalStorage) return;

  tasks = JSON.parse(tasksOnLocalStorage);

  tasks.forEach((t) => {
    renderTaskOnHTML(t.title, t.done);
  });
};

form.addEventListener("submit", (event) => {
  event.preventDefault(); // Evita o carregamento padrão da página ao submeter o formulario.

  const taskTitle = tasktitleInput.value;

  if (taskTitle.length < 3) {
    alert("Sua tarefa precisa ter, pelo menos, 3 caracteres.");
    return;
  }
  // Adicionando a nova terfa no arrey de tasks
  tasks.push({
    title: taskTitle,
    done: false,
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // Adicionando a nova tarefa no HTML
  renderTaskOnHTML(taskTitle);

  tasktitleInput.value = "";
});
