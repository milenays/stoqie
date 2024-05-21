// components/LoginForm.js
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { TextField, Button } from '@mui/material';
import { useRouter } from 'next/router';

export default function LoginForm() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const router = useRouter();

  const handleChange = (e) => setForm({
    ...form,
    [e.target.name]: e.target.value,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn('credentials', {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    if (!res.error) {
      router.push('/protected');
    } else {
      console.error(res.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField name="email" label="Email" variant="outlined" onChange={handleChange} value={form.email} />
      <TextField name="password" label="Password" type="password" variant="outlined" onChange={handleChange} value={form.password} />
      <Button type="submit" variant="contained" color="primary">Login</Button>
    </form>
  );
}