import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import AdminTaskList from '../components/AdminTaskList';  // Admin task list component
import TaskList from '../components/TaskList';  // Regular user task list

const Dashboard = () => {
  const { user } = useContext(AuthContext);  // Get user from context

  return (
    <div>
      {user && user.role === 'admin' ? (
        <AdminTaskList />  // Show admin task list for admins
      ) : (
        <TaskList />  // Show regular task list for regular users
      )}
    </div>
  );
};

export default Dashboard;
