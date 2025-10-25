// Array to store task objects
let tasks = [];

// Get DOM elements
const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");

// Handle form submission
taskForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Get task details
  const title = document.getElementById("taskTitle").value.trim();
  const priority = document.getElementById("taskPriority").value;
  const status = document.querySelector('input[name="taskStatus"]:checked').value;

  // Create task object
  const task = {
    title,
    priority,
    status
  };

  // Add to array
  tasks.push(task);

  // Update DOM
  addTaskToDOM(task, tasks.length - 1);

  // Reset form
  taskForm.reset();
  document.getElementById("pending").checked = true;
});

// Add a task to the DOM
function addTaskToDOM(task, index) {
  const li = document.createElement("li");
  li.classList.add("list-group-item", `priority-${task.priority}`);
  if (task.status === "completed") li.classList.add("completed");

  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task-details");
  taskDiv.innerHTML = `<strong>${task.title}</strong> 
    <span class="text-muted">[${task.priority.toUpperCase()} priority - ${task.status}]</span>`;

  const btnGroup = document.createElement("div");

  // Complete button
  const completeBtn = document.createElement("button");
  completeBtn.classList.add("btn", "btn-success", "btn-sm", "me-2");
  completeBtn.textContent = "Mark Complete";
  completeBtn.onclick = () => markTaskComplete(index, li);

  // Remove button
  const removeBtn = document.createElement("button");
  removeBtn.classList.add("btn", "btn-danger", "btn-sm");
  removeBtn.textContent = "Remove";
  removeBtn.onclick = () => removeTask(index, li);

  btnGroup.appendChild(completeBtn);
  btnGroup.appendChild(removeBtn);

  li.appendChild(taskDiv);
  li.appendChild(btnGroup);
  taskList.appendChild(li);
}

// Mark a task as completed
function markTaskComplete(index, listItem) {
  tasks[index].status = "completed";
  listItem.classList.add("completed");
  listItem.querySelector(".task-details span").textContent = `[${tasks[index].priority.toUpperCase()} priority - completed]`;
}

// Remove a task
function removeTask(index, listItem) {
  tasks.splice(index, 1);
  listItem.remove();
}
