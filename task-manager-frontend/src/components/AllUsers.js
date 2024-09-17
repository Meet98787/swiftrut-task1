import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const { token, user } = useContext(AuthContext);  // Get the token and user from context

  useEffect(() => {
    // Fetch all users if the user is an admin
    const fetchUsers = async () => {
      if (user && user.role === 'admin') {
        try {
          const response = await axios.get('http://localhost:5000/api/users/all', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUsers(response.data);
        } catch (error) {
          console.error('Failed to fetch users:', error);
        }
      }
    };

    fetchUsers();
  }, [user, token]);

  return (
    <div>
      <h2>All Users</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
