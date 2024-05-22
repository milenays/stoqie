// components/ProductForm.js
import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import Notification from './Notification';

export default function ProductForm({ product, onSave }) {
  const [form, setForm] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || '',
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
      const res = await fetch(product ? `/api/products/${product._id}` : '/api/products', {
        method: product ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setNotification({ message: data.message || 'Success', severity: res.ok ? 'success' : 'error' });
      onSave();
    } catch (error) {
      setNotification({ message: 'Error saving product', severity: 'error' });
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
        <TextField
          name="description"
          label="Description"
          variant="outlined"
          onChange={handleChange}
          value={form.description}
        />
        <TextField
          name="price"
          label="Price"
          variant="outlined"
          onChange={handleChange}
          value={form.price}
        />
        <Button type="submit" variant="contained" color="primary">
          {product ? 'Update Product' : 'Add Product'}
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