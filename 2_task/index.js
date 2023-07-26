const taskList = document.getElementById("taskList");
const trashList = document.getElementById("trashList");

function createTask() {
  const taskText = document.getElementById("taskInput").value;
  if (!taskText) return;

  const taskDiv = document.createElement("div");
  taskDiv.className = "task";
  taskDiv.innerHTML = `
    <input type="checkbox" onclick="toggleTaskCompletion(this)">
    <span>${taskText}</span>
  `;

  taskList.appendChild(taskDiv);

  document.getElementById("taskInput").value = "";
}

function restoreTask(button) {
  const trashTaskDiv = button.parentNode;
  trashList.removeChild(trashTaskDiv);

  const taskDiv = document.createElement("div");
  taskDiv.className = "task";
  taskDiv.innerHTML = `
    <input type="checkbox" onclick="toggleTaskCompletion(this)">
    <span>${button.previousElementSibling.textContent}</span>
    `;
  taskList.appendChild(taskDiv);
}

function toggleTaskCompletion(checkbox) {
  const taskText = checkbox.nextElementSibling;
  if (checkbox.checked) {
    taskText.style.textDecoration = "line-through";
  } else {
    taskText.style.textDecoration = "none";
  }
}

function deleteTask(button) {
  const taskDiv = button.parentNode;
  taskList.removeChild(taskDiv);

  const trashTaskDiv = document.createElement("div");
  trashTaskDiv.className = "task";
  trashTaskDiv.innerHTML = `
    <span>${button.previousElementSibling.textContent}</span>
    <button onclick="restoreTask(this)">Восстановить</button>
  `;
  trashList.appendChild(trashTaskDiv);
}

function showTrash() {
  if (trashList.style.display === "none") {
    trashList.style.display = "block";
  } else {
    trashList.style.display = "none";
  }
}

function selectAll() {
  const tasks = document.querySelectorAll('.task input[type="checkbox"]');

  const allChecked = Array.from(tasks).every((checkbox) =>
    toggleTaskCompletion(checkbox)
  );

  tasks.forEach((checkbox) => {
    checkbox.checked = !allChecked;
    toggleTaskCompletion(checkbox);
    const taskText = checkbox.nextElementSibling;
    taskText.style.textDecoration = checkbox.checked ? "line-through" : "none";
  });
}

function deleteSelectedTasks() {
  const tasks = document.querySelectorAll(
    '.task input[type="checkbox"]:checked'
  );

  tasks.forEach((checkbox) => {
    const taskDiv = checkbox.parentNode;
    const taskText = taskDiv.querySelector("span").textContent;

    taskList.removeChild(taskDiv);

    const trashTaskDiv = document.createElement("div");
    trashTaskDiv.className = "task";
    trashTaskDiv.innerHTML = `
        <span>${taskText}</span>
        <button onclick="restoreTask(this)">Восстановить</button>
      `;
    trashList.appendChild(trashTaskDiv);
  });
}

function toggleTaskCompletion(checkbox) {
  const taskText = checkbox.nextElementSibling;
  if (checkbox.checked) {
    taskText.style.textDecoration = "line-through";
  } else {
    taskText.style.textDecoration = "none";
  }

  const selectedTasks = document.querySelectorAll(
    '.task input[type="checkbox"]:checked'
  );
  const deleteButton = document.getElementById("deleteButton");
}
