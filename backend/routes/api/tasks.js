const express = require('express');
const router = express.Router();
const { getAllTasks, createTask, updatedTask, deleteTask, getSingleTask } = require('../../backend/controllers/tasksController');
// Create a Task 
router.post('/', createTask);

// Get all Tasks
router.get('/', getAllTasks);

// Get a single Task 
router.get('/:id', getSingleTask);

// Update a task
router.put('/:id', updatedTask);

// Delete a task
router.delete('/:id', deleteTask);

module.exports = router;