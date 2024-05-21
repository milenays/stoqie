// components/LoginForm.js
import { Input, Button } from '@nextui-org/react';
import { useState } from 'react';

export default function LoginForm() {
  const [form, setForm] = useState({
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
    const res = await fetch('/api/login', {
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
      <Input name="email" label="Email" onChange={handleChange} value={form.email} />
      <Input.Password
        name="password"
        label="Password"
        onChange={handleChange}
        value={form.password}
      />
      <Button type="submit">Login</Button>
    </form>
  );
}