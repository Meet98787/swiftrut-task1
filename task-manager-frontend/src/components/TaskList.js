import React, { useState, useEffect, useContext } from 'react';
import { Container, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import TaskForm from './TaskForm';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null); // State to track editing task
  const { token } = useContext(AuthContext);  // Get token from context

  // Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
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
      fetchTasks(); // Refresh task list after deletion
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  // Edit task
  const editTask = (task) => {
    setEditingTask(task); // Set task to be edited
  };

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        My Tasks
      </Typography>

      {/* Render TaskForm for creating or editing tasks */}
      <TaskForm fetchTasks={fetchTasks} editingTask={editingTask} setEditingTask={setEditingTask} />

      <List>
        {tasks.map((task) => (
          <ListItem key={task._id}>
            <ListItemText primary={task.title} secondary={task.description} />
            
            {/* Edit Icon */}
            <IconButton edge="end" aria-label="edit" onClick={() => editTask(task)}>
              <EditIcon />
            </IconButton>

            {/* Delete Icon */}
            <IconButton edge="end" aria-label="delete" onClick={() => deleteTask(task._id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default TaskList;
