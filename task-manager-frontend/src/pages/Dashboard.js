import React, { useEffect, useState, useContext } from 'react';
import { Container, Button, Typography, List, ListItem } from '@mui/material';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/tasks');
        setTasks(data);
      } catch (error) {
        console.error('Failed to fetch tasks', error);
      }
    };
    fetchTasks();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Container>
      <Typography variant="h4">Dashboard</Typography>
      <Button onClick={handleLogout}>Logout</Button>
      <List>
        {tasks.map((task) => (
          <ListItem key={task._id}>{task.title}</ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Dashboard;
