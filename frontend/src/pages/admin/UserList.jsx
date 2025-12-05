import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import { FaCheck, FaTimes } from 'react-icons/fa';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await api.get('/users');
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
        alert('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Users</h1>
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', boxShadow: '0 0 20px rgba(0, 0, 0, 0.15)' }}>
          <thead>
            <tr style={{ textAlign: 'left', background: '#009879', color: '#ffffff' }}>
              <th style={{ padding: '12px 15px' }}>ID</th>
              <th style={{ padding: '12px 15px' }}>NAME</th>
              <th style={{ padding: '12px 15px' }}>EMAIL</th>
              <th style={{ padding: '12px 15px', textAlign: 'center' }}>ADMIN</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} style={{ borderBottom: '1px solid #dddddd' }}>
                <td style={{ padding: '12px 15px' }}>{user._id}</td>
                <td style={{ padding: '12px 15px' }}>{user.name}</td>
                <td style={{ padding: '12px 15px' }}>
                  <a href={`mailto:${user.email}`} style={{ color: '#333' }}>{user.email}</a>
                </td>
                <td style={{ padding: '12px 15px', textAlign: 'center' }}>
                  {user.isAdmin ? (
                    <FaCheck style={{ color: 'green' }} />
                  ) : (
                    <FaTimes style={{ color: 'red' }} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserList;