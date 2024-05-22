import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import Notification from './Notification';

export default function BrandForm({ onSave }) {
  const [form, setForm] = useState({
    name: '',
  });
  const [notification, setNotification] = useState({ message: '', severity: 'success' });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/brands', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setNotification({ message: data.message || 'Brand added successfully!', severity: res.ok ? 'success' : 'error' });
      onSave();
    } catch (error) {
      setNotification({ message: 'Error saving brand', severity: 'error' });
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
        />
        <Button type="submit" variant="contained" color="primary">
          Add Brand
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