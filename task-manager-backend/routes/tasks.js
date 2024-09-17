const express = require('express');
const Task = require('../models/Task');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Create Task
router.post('/', authMiddleware(), async (req, res) => {
  const { title, description, category } = req.body;
  const task = new Task({ title, description, category, user: req.user._id });

  try {
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: 'Error creating task', error });
  }
});

// Get User's Tasks
router.get('/', authMiddleware(), async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching tasks', error });
  }
});

// Admin: Get All Tasks
router.get('/all', authMiddleware(['admin']), async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching tasks', error });
  }
});

// Delete Task (User can delete own task, Admin can delete any task)
router.delete('/:id', authMiddleware(), async (req, res) => {
    try {
      // Find the task by its ID
      let task = await Task.findById(req.params.id);
      if (!task) return res.status(404).json({ message: 'Task not found' });
  
      // Check if the logged-in user owns the task or is an admin
    //   if (task.user.toString() !== req.user._id && req.user.role !== 'admin') {
    //     return res.status(403).json({ message: 'Permission denied' });
    //   }
  
      // Delete the task
      await Task.findByIdAndDelete(req.params.id);
      res.json({ message: 'Task deleted' });
    } catch (error) {
      res.status(400).json({ message: 'Error deleting task', error });
    }
  });
  
  

// Edit Task (User can edit own task, Admin can edit any task)
router.put('/:id', authMiddleware(), async (req, res) => {
    try {
      // Find the task by its ID
      let task = await Task.findById(req.params.id);
      if (!task) return res.status(404).json({ message: 'Task not found' });
  
      // Check if the logged-in user owns the task or is an admin
    //   if (task.user.toString() !== req.user._id && req.user.role !== 'admin') {
    //     return res.status(403).json({ message: 'Permission denied' });
    //   }
  
      // Update the task
      task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(task);
    } catch (error) {
      res.status(400).json({ message: 'Error updating task', error });
    }
  });
  
  // Mark task as completed (only owner can complete their task)
router.patch('/:id/complete', authMiddleware(), async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      // Check if the logged-in user owns the task
    //   if (task.user.toString() !== req.user._id) {
    //     return res.status(403).json({ message: 'Permission denied' });
    //   }
  
      // Mark the task as completed
      task.completed = true;
      await task.save();
      res.json({ message: 'Task marked as completed', task });
    } catch (error) {
      res.status(500).json({ message: 'Error completing task', error });
    }
  });
  

module.exports = router;
