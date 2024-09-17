import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import TaskForm from './TaskForm';
import AllUsers from './AllUsers';

const AdminTaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const { token, user, logout } = useContext(AuthContext);  // Get token, user, and logout from context
  const navigate = useNavigate();

  // Fetch all tasks for admin
  const fetchAllTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks/all', {
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
      fetchAllTasks();  // Refresh task list after deletion
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  // Edit task
  const editTask = (task) => {
    setEditingTask(task);  // Set task to be edited
  };

  // Handle logout
  const handleLogout = () => {
    logout();  // Call logout from context
    navigate('/login');  // Redirect to login after logout
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

      <AllUsers />

      {/* Logout Button */}
      <button onClick={handleLogout}>Logout</button>

      {/* Render TaskForm for creating or editing tasks */}
      <TaskForm fetchTasks={fetchAllTasks} editingTask={editingTask} setEditingTask={setEditingTask} />

      <List>
        {tasks.map((task) => (
          <ListItem key={task._id} className='shadow-lg p-5 mt-5'>
            <ListItemText
              primary={task.title}
              secondary={`Created by: ${task.user?.username || 'Unknown'} - ${task.description}`}
            />
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

export default AdminTaskList;
