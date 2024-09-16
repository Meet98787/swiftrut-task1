import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import AdminTaskList from '../components/AdminTaskList';  // Admin task list component
import TaskList from '../components/TaskList';  // Regular user task list

const Dashboard = () => {
    const { logout, user } = useContext(AuthContext);  // Get user from context
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();  // Call logout from context
        navigate('/login');  // Redirect to login after logout
    };
    return (
        <div>
            {user && user.role === 'admin' ? (
                <AdminTaskList />  // Show admin task list for admins
            ) : (
                <TaskList />  // Show regular task list for regular users
            )}

            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Dashboard;
