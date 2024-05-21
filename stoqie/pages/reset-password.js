// pages/reset-password.js
import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import Notification from '../components/Notification';

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField 
          name="email" 
          label="Email" 
          variant="outlined" 
          onChange={(e) => setEmail(e.target.value)} 
          value={email} 
        />
        <Button type="submit" variant="contained" color="primary">
          Reset Password
        </Button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}