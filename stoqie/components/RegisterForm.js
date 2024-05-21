// components/RegisterForm.js
import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

export default function RegisterForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    console.log(data);
  };

  return (
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
      />
      <TextField
        name="password"
        label="Password"
        type="password"
        variant="outlined"
        onChange={handleChange}
        value={form.password}
      />
      <Button type="submit" variant="contained" color="primary">
        Register
      </Button>
    </form>
  );
}