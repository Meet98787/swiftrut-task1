import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import TaskList from './components/TaskList';
import AuthContext from './context/AuthContext';
import Dashboard from './pages/Dashboard';

const App = () => {
  const { token } = useContext(AuthContext);  // Get token from AuthContext

  // Protected Route: Redirect to login if not authenticated
  const ProtectedRoute = ({ children }) => {
    return token ? children : <Navigate to="/login" />;
  };

  return (
    <div className="App">
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        
        {/* Default Route: Redirect to dashboard if authenticated */}
        <Route path="/" element={<Navigate to={token ? "/dashboard" : "/login"} />} />
      </Routes>
    </div>
  );
};

export default App;
