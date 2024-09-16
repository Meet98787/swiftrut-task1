import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import TaskList from './components/TaskList';
import AdminTaskList from './components/AdminTaskList';  // Admin task list
import AuthContext from './context/AuthContext';
import Dashboard from './pages/Dashboard';

const App = () => {
  const { token, user } = useContext(AuthContext);  // Get token and user from context

  // Protected Route: Redirect to login if not authenticated
  const ProtectedRoute = ({ children }) => {
    return token ? children : <Navigate to="/login" />;
  };

  // Admin Protected Route: Redirect to login if not admin
  const AdminProtectedRoute = ({ children }) => {
    return user && user.role === 'admin' ? children : <Navigate to="/login" />;
  };

  return (
    <div className="App">
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        
        {/* User Dashboard */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <TaskList />
          </ProtectedRoute>
        } />
        
        {/* Admin Dashboard */}
        <Route path="/admin-dashboard" element={
          <AdminProtectedRoute>
            <AdminTaskList />
          </AdminProtectedRoute>
        } />
        
        {/* Default Route */}
        <Route path="/" element={<Navigate to={token ? "/dashboard" : "/login"} />} />
      </Routes>
    </div>
  );
};

export default App;
