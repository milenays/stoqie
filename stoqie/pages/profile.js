// pages/profile.js
import { useState, useEffect } from 'react';
import { getSession, useSession } from 'next-auth/react';
import { TextField, Button } from '@mui/material';
import Notification from '../components/Notification';

export default function ProfilePage() {
  const { data: session } = useSession();
  const [form, setForm] = useState({
    name: '',
    email: '',
  });
  const [notification, setNotification] = useState({ message: '', severity: 'success' });

  useEffect(() => {
    if (session) {
      setForm({
        name: session.user.name || '',
        email: session.user.email || '',
      });
    }
  }, [session]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setNotification({ message: 'Profile updated successfully!', severity: 'success' });
      } else {
        setNotification({ message: 'Error updating profile.', severity: 'error' });
      }
    } catch (error) {
      setNotification({ message: 'An error occurred.', severity: 'error' });
    }
  };

  if (!session) {
    return <div>Loading...</div>;
  }

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
        <TextField 
          name="email" 
          label="Email" 
          variant="outlined" 
          onChange={handleChange} 
          value={form.email} 
          disabled 
        />
        <Button type="submit" variant="contained" color="primary">
          Update Profile
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

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { session }
  };
}