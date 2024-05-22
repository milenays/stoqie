import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, Typography, Container, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress } from '@mui/material';
import CategoryForm from '../../components/CategoryForm';
import BrandForm from '../../components/BrandForm';
import ImageUpload from '../../components/ImageUpload';
import Notification from '../../components/Notification';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

export default function EditProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [notification, setNotification] = useState({ message: '', severity: 'success' });
  const [categoryFormOpen, setCategoryFormOpen] = useState(false);
  const [brandFormOpen, setBrandFormOpen] = useState(false);

  // Kategori ve Marka Veri Çekme Fonksiyonları
  const fetchCategories = async () => {
    const res = await fetch('/api/categories');
    const data = await res.json();
    setCategories(data.data);
  };

  const fetchBrands = async () => {
    const res = await fetch('/api/brands');
    const data = await res.json();
    setBrands(data.data);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`/api/products/${id}`);
      const data = await res.json();
      if (res.ok) {
        setProduct({ ...data.data, images: data.data.images || [] });
      } else {
        setNotification({ message: 'Error fetching product', severity: 'error' });
      }
      setLoading(false);
    };

    if (id) {
      fetchProduct();
      fetchCategories();
      fetchBrands();
    }
  }, [id]);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleQuillChange = (value) => {
    setProduct({
      ...product,
      description: value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      const data = await res.json();
      if (res.ok) {
        setNotification({ message: 'Product updated successfully!', severity: 'success' });
      } else {
        setNotification({ message: data.message || 'Error updating product', severity: 'error' });
      }
    } catch (error) {
      setNotification({ message: 'Error updating product', severity: 'error' });
    }
  };

  if (loading || !product) {
    return <CircularProgress />;
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Edit Product
      </Typography>
      <form onSubmit={handleSave}>
        <TextField
          name="name"
          label="Product Name"
          variant="outlined"
          onChange={handleChange}
          value={product.name}
          fullWidth
          required
          InputProps={{
            endAdornment: `${product.name.length}/100`,
          }}
        />
        <TextField
          name="stockCode"
          label="Stock Code"
          variant="outlined"
          onChange={handleChange}
          value={product.stockCode}
          fullWidth
          required
        />
        <TextField
          name="barcode"
          label="Barcode"
          variant="outlined"
          onChange={handleChange}
          value={product.barcode}
          fullWidth
          required
        />
        <FormControl fullWidth>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            name="category"
            value={product.category}
            onChange={handleChange}
          >
            {categories.map((category) => (
              <MenuItem key={category._id} value={category.name}>{category.name}</MenuItem>
            ))}
            <MenuItem onClick={() => setCategoryFormOpen(true)}>+ Add Category</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="brand-label">Brand</InputLabel>
          <Select
            labelId="brand-label"
            name="brand"
            value={product.brand}
            onChange={handleChange}
          >
            {brands.map((brand) => (
              <MenuItem key={brand._id} value={brand.name}>{brand.name}</MenuItem>
            ))}
            <MenuItem onClick={() => setBrandFormOpen(true)}>+ Add Brand</MenuItem>
          </Select>
        </FormControl>
        <Typography variant="h6">Description</Typography>
        <ReactQuill
          value={product.description}
          onChange={handleQuillChange}
        />
        <TextField
          name="volume"
          label="Volume"
          variant="outlined"
          onChange={handleChange}
          value={product.volume}
          fullWidth
          required
        />
        <TextField
          name="stock"
          label="Stock"
          variant="outlined"
          onChange={handleChange}
          value={product.stock}
          fullWidth
          required
        />
        <TextField
          name="fakeStock"
          label="Fake Stock"
          variant="outlined"
          onChange={handleChange}
          value={product.fakeStock}
          fullWidth
        />
        <TextField
          name="criticalStock"
          label="Critical Stock"
          variant="outlined"
          onChange={handleChange}
          value={product.criticalStock}
          fullWidth
        />
        <TextField
          name="marketPrice"
          label="Market Price"
          variant="outlined"
          onChange={handleChange}
          value={product.marketPrice}
          fullWidth
        />
        <TextField
          name="salePrice"
          label="Sale Price"
          variant="outlined"
          onChange={handleChange}
          value={product.salePrice}
          fullWidth
          required
        />
        <TextField
          name="purchasePrice"
          label="Purchase Price"
          variant="outlined"
          onChange={handleChange}
          value={product.purchasePrice}
          fullWidth
          required
        />
        <TextField
          name="shelfCode"
          label="Shelf Code"
          variant="outlined"
          onChange={handleChange}
          value={product.shelfCode}
          fullWidth
          required
        />
        <TextField
          name="areaCode"
          label="Area Code"
          variant="outlined"
          onChange={handleChange}
          value={product.areaCode}
          fullWidth
          required
        />
        <Typography variant="h6" gutterBottom>
          Images
        </Typography>
        <ImageUpload images={product.images} setImages={(images) => setProduct({ ...product, images })} />
        <Button type="submit" variant="contained" color="primary">
          Save Changes
        </Button>
      </form>
      <Notification 
        message={notification.message} 
        onClose={() => setNotification({ message: '', severity: notification.severity })}
        severity={notification.severity}
      />
      <Dialog open={categoryFormOpen} onClose={() => setCategoryFormOpen(false)}>
        <DialogTitle>Add Category</DialogTitle>
        <DialogContent>
          <CategoryForm 
            onSave={() => {
              setCategoryFormOpen(false);
              fetchCategories();
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCategoryFormOpen(false)} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={brandFormOpen} onClose={() => setBrandFormOpen(false)}>
        <DialogTitle>Add Brand</DialogTitle>
        <DialogContent>
          <BrandForm 
            onSave={() => {
              setBrandFormOpen(false);
              fetchBrands();
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setBrandFormOpen(false)} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}