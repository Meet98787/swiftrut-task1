import React, { useState, useEffect, useContext } from 'react';
import { Container, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import TaskForm from './TaskForm';

const AdminTaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);  // State to track editing task
  const { token, user } = useContext(AuthContext);  // Get token and user from context

  // Fetch all tasks for admin
  const fetchAllTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks/all', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data);  // Set the tasks for admin
    } catch (error) {
      console.error('Failed to fetch tasks for admin:', error);
    }
  };

  // Delete task
  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchAllTasks();  // Refresh task list after deletion
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  // Edit task
  const editTask = (task) => {
    setEditingTask(task);  // Set task to be edited
  };

  useEffect(() => {
    if (user && user.role === 'admin') {
      fetchAllTasks();  // Fetch all tasks if user is admin
    }
  }, [user]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard - All Tasks
      </Typography>

      {/* Render TaskForm for creating or editing tasks */}
      <TaskForm fetchTasks={fetchAllTasks} editingTask={editingTask} setEditingTask={setEditingTask} />

      <List>
        {tasks.map((task) => (
          <ListItem key={task._id}>
            <ListItemText
              primary={task.title}
              secondary={`Created by: ${task.user?.username || 'Unknown'} - ${task.description}`}
            />
            {/* Edit and Delete icons */}
            <IconButton edge="end" aria-label="edit" onClick={() => editTask(task)}>
              <EditIcon />
            </IconButton>
            <IconButton edge="end" aria-label="delete" onClick={() => deleteTask(task._id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default AdminTaskList;
