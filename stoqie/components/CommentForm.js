// components/CommentForm.js
import { useState } from 'react';
import { TextField, Button, Rating } from '@mui/material';
import Notification from './Notification';

export default function CommentForm({ productId, userId, onSave }) {
  const [form, setForm] = useState({
    productId,
    userId,
    content: '',
    rating: 0,
  });
  const [notification, setNotification] = useState({ message: '', severity: 'success' });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRatingChange = (event, newValue) => {
    setForm({
      ...form,
      rating: newValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setNotification({ message: data.message || 'Success', severity: res.ok ? 'success' : 'error' });
      if (res.ok) onSave();
    } catch (error) {
      setNotification({ message: 'Error posting comment', severity: 'error' });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          name="content"
          label="Comment"
          variant="outlined"
          onChange={handleChange}
          value={form.content}
          multiline
        />
        <Rating
          name="rating"
          value={form.rating}
          onChange={handleRatingChange}
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
      <Notification 
        message={notification.message} 
        onClose={() => setNotification({ message: '', severity: notification.severity })}
        severity={notification.severity}
      />
    </div>
  );
}