import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  const login = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', { username, password });
      const token = response.data.token;
      const user = response.data;  // Assuming your backend returns the user object with role

      setToken(token);
      localStorage.setItem('token', token);
      setUser(user);  // Set the user object in state

      return user;  // Return the user object for further use (e.g., redirecting based on role)
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
