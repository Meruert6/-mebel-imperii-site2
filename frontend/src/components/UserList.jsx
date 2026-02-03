// frontend/src/components/UserList.jsx

import React, { useEffect, useState } from 'react';
import api from '../api';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/users')
      .then(res => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Users</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {users.map(u => (
          <li key={u._id} style={{
            padding: '0.5rem',
            margin: '0.5rem 0',
            backgroundColor: '#f5f5f5',
            borderRadius: '4px'
          }}>
            {u.name} - {u.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

