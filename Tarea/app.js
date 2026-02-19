// Selección de elementos del DOM
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Crear tarea
addTaskBtn.addEventListener("click", addTask);

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    // Crear elementos
    const li = document.createElement("li");
    const span = document.createElement("span");
    const actions = document.createElement("div");

    span.textContent = taskText;

    actions.classList.add("actions");

    // Botón completar
    const completeBtn = document.createElement("button");
    completeBtn.textContent = "✔";
    completeBtn.addEventListener("click", () => {
        li.classList.toggle("completed");
    });

    // Botón editar
    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.addEventListener("click", () => {
        const newText = prompt("Editar tarea:", span.textContent);
        if (newText !== null && newText.trim() !== "") {
            span.textContent = newText;
        }
    });

    // Botón eliminar
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";
    deleteBtn.addEventListener("click", () => {
        taskList.removeChild(li);
    });

    // Construir estructura
    actions.appendChild(completeBtn);
    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(actions);

    taskList.appendChild(li);
    taskInput.value = "";
}
