const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const BASE_URL = "http://localhost:5000"; // Replace with your backend URL
import { validateLogin, getAccessToken } from './login.js';

// Example usage
async function loginUser() {
  await validateLogin(); // Call the login function
  const token = getAccessToken(); // Get the updated accessToken
  console.log("Access Token:", token);
}

loginUser();
// Fetch all tasks from the backend
async function fetchTasks() {
  try {
    const response = await fetch(`${BASE_URL}/tasks`);
    const tasks = await response.json();
    displayTasks(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
}

// Add a new task
async function addTask() {
  if (inputBox.value === "") {
    alert("You must write something!");
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: inputBox.value, completed: false }),
    });
    const newTask = await response.json();
    console.log(newTask);
    inputBox.value = ""; // Clear input field
    fetchTasks(); // Refresh the task list
  } catch (error) {
    console.error("Error adding task:", error);
  }
}

// Update a task (mark as completed or incomplete)
async function updateTask(id, completed) {
  try {
    const response = await fetch(`${BASE_URL}/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !completed }),
    });
    const updatedTask = await response.json();
    console.log("Task updated successfully:", updatedTask);
    fetchTasks(); // Refresh the task list
    return updateTask;
  } catch (error) {
    console.error("Error updating task:", error);
  }
}

// Delete a task
async function deleteTask(id) {
  try {
    await fetch(`${BASE_URL}/tasks/${id}`, {
      method: "DELETE",
    });
    fetchTasks(); // Refresh the task list
  } catch (error) {
    console.error("Error deleting task:", error);
  }
}


function displayTasks(tasks) {
  listContainer.innerHTML = ""; // Clear existing tasks

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.textContent = task.title;
    if (task.completed) {
      li.classList.add("checked");
    }

    // Add click event to mark task as completed/incomplete
    li.addEventListener("click", () => updateTask(task._id, task.completed));

    // Add delete button
    const span = document.createElement("span");
    span.innerHTML = "\u00d7"; // Unicode for '×'
    span.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent li click event from firing
      deleteTask(task._id);
    });

    li.appendChild(span);
    listContainer.appendChild(li);
  });
}

// Fetch tasks when the page loads
window.onload = fetchTasks;