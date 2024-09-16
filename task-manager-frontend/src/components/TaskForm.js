import React, { useState, useContext, useEffect } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const TaskForm = ({ fetchTasks, editingTask, setEditingTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const { token } = useContext(AuthContext);

  // If editingTask is set, populate the form with existing task details
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setCategory(editingTask.category);
    } else {
      // Reset form if not editing
      setTitle('');
      setDescription('');
      setCategory('');
    }
  }, [editingTask]);

  // Handle form submission for creating or updating a task
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTask) {
        // Update an existing task
        await axios.put(`http://localhost:5000/api/tasks/${editingTask._id}`, {
          title,
          description,
          category,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        // Create a new task
        await axios.post('http://localhost:5000/api/tasks', {
          title,
          description,
          category,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      fetchTasks();  // Refresh task list
      setEditingTask(null);  // Reset form after submission
    } catch (error) {
      console.error('Failed to save task:', error);
    }
  };

  return (
    <Container className='shadow-lg p-5 mt-5'>
      <Typography variant="h5" gutterBottom>
        {editingTask ? 'Edit Task' : 'Create Task'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          label="Category"
          fullWidth
          margin="normal"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <Button variant="contained" color="primary" type="submit">
          {editingTask ? 'Update Task' : 'Create Task'}
        </Button>
      </form>
    </Container>
  );
};

export default TaskForm;
