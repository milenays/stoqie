import { useState, useEffect } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Notification from './Notification';

export default function UserForm({ user, onSave }) {
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || 'user',
  });
  const [notification, setNotification] = useState({ message: '', severity: 'success' });

  useEffect(() => {
    setForm({
      name: user?.name || '',
      email: user?.email || '',
      role: user?.role || 'user',
    });
  }, [user]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(user ? `/api/users/${user._id}` : '/api/users', {
        method: user ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setNotification({ message: data.message || 'Success', severity: res.ok ? 'success' : 'error' });
      onSave(data.success);
    } catch (error) {
      setNotification({ message: 'Error saving user', severity: 'error' });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          name="name"
          label="Name"
          variant="outlined"
          onChange={handleChange}
          value={form.name}
          fullWidth
          required
        />
        <TextField
          name="email"
          label="Email"
          variant="outlined"
          onChange={handleChange}
          value={form.email}
          fullWidth
          required
        />
        <FormControl fullWidth required>
          <InputLabel id="role-label">Role</InputLabel>
          <Select
            labelId="role-label"
            name="role"
            value={form.role}
            onChange={handleChange}
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          {user ? 'Update User' : 'Add User'}
        </Button>
      </form>
      <Notification
        message={notification.message}
        onClose={() => setNotification({ message: '', severity: 'success' })}
        severity={notification.severity}
      />
    </div>
  );
}