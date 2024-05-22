// components/BrandList.js
import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import Notification from './Notification';

export default function BrandList() {
  const [brands, setBrands] = useState([]);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await fetch('/api/brands');
        const data = await res.json();
        setBrands(data.data);
      } catch (error) {
        setMessage('Error fetching brands');
        setSeverity('error');
      }
    };

    fetchBrands();
  }, []);

  const handleDelete = async (brandId) => {
    try {
      const res = await fetch(`/api/brands/${brandId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setBrands(brands.filter((brand) => brand._id !== brandId));
        setMessage('Brand deleted successfully');
        setSeverity('success');
      } else {
        setMessage('Error deleting brand');
        setSeverity('error');
      }
    } catch (error) {
      setMessage('Error deleting brand');
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
          {brands.map((brand) => (
            <TableRow key={brand._id}>
              <TableCell>{brand.name}</TableCell>
              <TableCell>
                <Button 
                  color="secondary" 
                  variant="contained"
                  onClick={() => handleDelete(brand._id)}
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