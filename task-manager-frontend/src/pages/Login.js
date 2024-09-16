import React, { useState, useContext } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);  // Get login function from context
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const loggedInUser = await login(username, password);  // Call login and get the user object

      if (loggedInUser.role === 'admin') {
        navigate('/admin-dashboard');  // Redirect to admin dashboard if admin
      } else {
        navigate('/dashboard');  // Redirect to user dashboard if regular user
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" type="submit">
          Login
        </Button>
      </form>
    </Container>
  );
};

export default Login;
