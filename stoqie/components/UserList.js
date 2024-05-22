import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import Notification from './Notification';

export default function UserList() {
  const [users, setUsers] = useState([]); // Varsayılan olarak boş bir dizi
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/users');
        const data = await res.json();
        if (res.ok) {
          setUsers(data.data); // API çağrısı başarılıysa kullanıcıları belirle
        } else {
          setMessage('Error fetching users');
          setSeverity('error');
        }
      } catch (error) {
        setMessage('Error fetching users');
        setSeverity('error');
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setUsers(users.filter((user) => user._id !== userId));
        setMessage('User deleted successfully');
        setSeverity('success');
      } else {
        setMessage('Error deleting user');
        setSeverity('error');
      }
    } catch (error) {
      setMessage('Error deleting user');
      setSeverity('error');
    }
  };

  if (!users) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.length > 0 ? (
            users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4}>No users found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Notification
        message={message}
        onClose={() => setMessage('')}
        severity={severity}
      />
    </div>
  );
}