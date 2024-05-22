// components/ProductListWithFilter.js
import { useState, useEffect } from 'react';
import { TextField, Select, MenuItem, Table, TableBody, TableCell, TableHead, TableRow, Button, Link } from '@mui/material';
import NextLink from 'next/link';
import Notification from './Notification';

export default function ProductListWithFilter() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');

  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/categories')
        ]);

        const productsData = await productsRes.json();
        const categoriesData = await categoriesRes.json();

        setProducts(productsData.data);
        setCategories(categoriesData.data);
      } catch (error) {
        setMessage('Error fetching products and categories');
        setSeverity('error');
      }
    };

    fetchProductsAndCategories();
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

  const filteredProducts = products.filter((product) => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (!selectedCategory || product.category === selectedCategory)
  );

  return (
    <div>
      <TextField 
        label="Search Products" 
        variant="outlined" 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
        style={{ marginBottom: '1rem' }} 
      />
      <Select
        label="Filter by Category"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        style={{ marginBottom: '1rem' }}
        fullWidth
      >
        <MenuItem value="">All Categories</MenuItem>
        {categories.map((category) => (
          <MenuItem key={category._id} value={category.name}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
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
          {filteredProducts.map((product) => (
            <TableRow key={product._id}>
              <TableCell>
                <NextLink href={`/products/${product._id}`} passHref>
                  <Link>{product.name}</Link>
                </NextLink>
              </TableCell>
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