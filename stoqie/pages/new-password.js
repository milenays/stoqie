// pages/new-password.js
import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useRouter } from 'next/router';
import Notification from '../components/Notification';

export default function NewPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');
  const router = useRouter();
  const { user } = router.query;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      setSeverity('error');
      return;
    }

    const res = await fetch('/api/new-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user, password }),
    });
    const data = await res.json();
    setMessage(data.message);
    setSeverity(res.ok ? 'success' : 'error');
    if (res.ok) {
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          name="password"
          label="New Password"
          type="password"
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <TextField
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          variant="outlined"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
        />
        <Button type="submit" variant="contained" color="primary">
          Set New Password
        </Button>
      </form>
      <Notification 
        message={message} 
        onClose={() => setMessage('')}
        severity={severity}
      />
    </div>
  );
}