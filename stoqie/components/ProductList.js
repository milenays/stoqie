// components/ProductList.js
import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import Notification from './Notification';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data.data);
      } catch (error) {
        setMessage('Error fetching products');
        setSeverity('error');
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setProducts(products.filter((product) => product._id !== productId));
        setMessage('Product deleted successfully');
        setSeverity('success');
      } else {
        setMessage('Error deleting product');
        setSeverity('error');
      }
    } catch (error) {
      setMessage('Error deleting product');
      setSeverity('error');
    }
  };

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product._id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>
                <Button 
                  color="secondary" 
                  variant="contained"
                  onClick={() => handleDelete(product._id)}
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