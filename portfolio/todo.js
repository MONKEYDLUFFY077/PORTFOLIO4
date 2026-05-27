const todoForm =
  document.getElementById("todo-form");

const taskInput =
  document.getElementById("task-input");

const taskList =
  document.getElementById("task-list");

const filterButtons =
  document.querySelectorAll(".filter-btn");

let tasks =
  JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";

function saveTasks() {
  localStorage.setItem(
    "tasks",
    JSON.stringify(tasks)
  );
}

function renderTasks() {

  taskList.innerHTML = "";

  let filteredTasks = tasks;

  if (currentFilter === "active") {
    filteredTasks =
      tasks.filter(task => !task.completed);
  }

  if (currentFilter === "completed") {
    filteredTasks =
      tasks.filter(task => task.completed);
  }

  filteredTasks.forEach(task => {

    const li =
      document.createElement("li");

    li.className = "task-item";

    li.innerHTML = `
      <div class="task-content">

        <input
          type="checkbox"
          ${task.completed ? "checked" : ""}
          aria-label="Mark task complete"
        >

        <span class="task-text ${task.completed ? "completed" : ""}">
          ${task.text}
        </span>

      </div>

      <div class="task-actions">

        <button class="edit-btn">
          Edit
        </button>

        <button class="delete-btn">
          Delete
        </button>

      </div>
    `;

    const checkbox =
      li.querySelector("input");

    checkbox.addEventListener("change", () => {

      task.completed =
        checkbox.checked;

      saveTasks();
      renderTasks();

    });

    /* DELETE TASK */
    const deleteBtn =
      li.querySelector(".delete-btn");

    deleteBtn.addEventListener("click", () => {

      tasks =
        tasks.filter(t => t.id !== task.id);

      saveTasks();
      renderTasks();

    });

    /* EDIT TASK */
    const editBtn =
      li.querySelector(".edit-btn");

    editBtn.addEventListener("click", () => {

      const updatedText =
        prompt("Edit task:", task.text);

      if (
        updatedText &&
        updatedText.trim() !== ""
      ) {

        task.text =
          updatedText.trim();

        saveTasks();
        renderTasks();

      }

    });

    taskList.appendChild(li);

  });

}

todoForm.addEventListener("submit", event => {

  event.preventDefault();

  const text =
    taskInput.value.trim();

  if (!text) return;

  tasks.push({
    id: Date.now(),
    text,
    completed: false
  });

  saveTasks();
  renderTasks();

  todoForm.reset();

});

filterButtons.forEach(button => {

  button.addEventListener("click", () => {

    filterButtons.forEach(btn =>
      btn.classList.remove("active")
    );

    button.classList.add("active");

    currentFilter =
      button.dataset.filter;

    renderTasks();

  });

});

renderTasks();