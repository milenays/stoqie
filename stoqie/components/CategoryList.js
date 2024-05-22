// components/CategoryList.js
import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import Notification from './Notification';

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories');
        const data = await res.json();
        setCategories(data.data);
      } catch (error) {
        setMessage('Error fetching categories');
        setSeverity('error');
      }
    };

    fetchCategories();
  }, []);

  const handleDelete = async (categoryId) => {
    try {
      const res = await fetch(`/api/categories/${categoryId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setCategories(categories.filter((category) => category._id !== categoryId));
        setMessage('Category deleted successfully');
        setSeverity('success');
      } else {
        setMessage('Error deleting category');
        setSeverity('error');
      }
    } catch (error) {
      setMessage('Error deleting category');
      setSeverity('error');
    }
  };

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category._id}>
              <TableCell>{category.name}</TableCell>
              <TableCell>
                <Button 
                  color="secondary" 
                  variant="contained"
                  onClick={() => handleDelete(category._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Notification 
        message={message} 
        onClose={() => setMessage('')}
        severity={severity}
      />
    </div>
  );
}