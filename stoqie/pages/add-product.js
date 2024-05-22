import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, Typography, Container, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress } from '@mui/material'; // CircularProgress eklendi
import CategoryForm from '../components/CategoryForm'; // CategoryForm'u içe aktar
import BrandForm from '../components/BrandForm'; // BrandForm'u içe aktar
import ImageUpload from '../components/ImageUpload'; // ImageUpload'u içe aktar
import Notification from '../components/Notification';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

export default function AddProductPage() {
  const [productType, setProductType] = useState('single');
  const [form, setForm] = useState({
    name: '',
    stockCode: '',
    barcode: '',
    category: '',
    brand: '',
    description: '',
    volume: '',
    stock: '',
    fakeStock: '',
    criticalStock: '',
    marketPrice: '',
    salePrice: '',
    purchasePrice: '',
    shelfCode: '',
    areaCode: '',
    images: [],
  });
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [notification, setNotification] = useState({ message: '', severity: 'success' });
  const [categoryFormOpen, setCategoryFormOpen] = useState(false);
  const [brandFormOpen, setBrandFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);

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
    fetchCategories();
    fetchBrands();
    setLoading(false); // Veriler yüklendiğinde loading state'ini false olarak güncelle
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleQuillChange = (value) => {
    setForm({
      ...form,
      description: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const uniqueID = `uni_${Math.random().toString(36).substr(2, 9)}`;
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...form, uniqueID }),
      });
      const data = await res.json();
      if (res.ok) {
        setNotification({ message: 'Product added successfully!', severity: 'success' });
        setForm({
          name: '',
          stockCode: '',
          barcode: '',
          category: '',
          brand: '',
          description: '',
          volume: '',
          stock: '',
          fakeStock: '',
          criticalStock: '',
          marketPrice: '',
          salePrice: '',
          purchasePrice: '',
          shelfCode: '',
          areaCode: '',
          images: [],
        });
      } else {
        setNotification({ message: data.message || 'Error adding product', severity: 'error' });
      }
    } catch (error) {
      setNotification({ message: 'Error adding product', severity: 'error' });
    }
  };

  if (loading) {
    return <CircularProgress />; // CircularProgress eklendi
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Add Product
      </Typography>
      <FormControl fullWidth>
        <InputLabel id="product-type-label">Product Type</InputLabel>
        <Select
          label="Product Type"
          labelId="product-type-label"
          value={productType}
          onChange={(e) => setProductType(e.target.value)}
        >
          <MenuItem value="single">Single</MenuItem>
          <MenuItem value="variant">Variant</MenuItem>
        </Select>
      </FormControl>
      <form onSubmit={handleSubmit}>
        <TextField
          name="name"
          label="Product Name"
          variant="outlined"
          onChange={handleChange}
          value={form.name}
          fullWidth
          required
          InputProps={{
            endAdornment: `${form.name.length}/100`,
          }}
        />
        <TextField
          name="stockCode"
          label="Stock Code"
          variant="outlined"
          onChange={handleChange}
          value={form.stockCode}
          fullWidth
          required
        />
        <TextField
          name="barcode"
          label="Barcode"
          variant="outlined"
          onChange={handleChange}
          value={form.barcode}
          fullWidth
          required
        />
        <FormControl fullWidth>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            name="category"
            value={form.category}
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
            value={form.brand}
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
          value={form.description}
          onChange={handleQuillChange}
        />
        <TextField
          name="volume"
          label="Volume"
          variant="outlined"
          onChange={handleChange}
          value={form.volume}
          fullWidth
          required
        />
        <TextField
          name="stock"
          label="Stock"
          variant="outlined"
          onChange={handleChange}
          value={form.stock}
          fullWidth
          required
        />
        <TextField
          name="fakeStock"
          label="Fake Stock"
          variant="outlined"
          onChange={handleChange}
          value={form.fakeStock}
          fullWidth
        />
        <TextField
          name="criticalStock"
          label="Critical Stock"
          variant="outlined"
          onChange={handleChange}
          value={form.criticalStock}
          fullWidth
        />
        <TextField
          name="marketPrice"
          label="Market Price"
          variant="outlined"
          onChange={handleChange}
          value={form.marketPrice}
          fullWidth
        />
        <TextField
          name="salePrice"
          label="Sale Price"
          variant="outlined"
          onChange={handleChange}
          value={form.salePrice}
          fullWidth
          required
        />
        <TextField
          name="purchasePrice"
          label="Purchase Price"
          variant="outlined"
          onChange={handleChange}
          value={form.purchasePrice}
          fullWidth
          required
        />
        <TextField
          name="shelfCode"
          label="Shelf Code"
          variant="outlined"
          onChange={handleChange}
          value={form.shelfCode}
          fullWidth
          required
        />
        <TextField
          name="areaCode"
          label="Area Code"
          variant="outlined"
          onChange={handleChange}
          value={form.areaCode}
          fullWidth
          required
        />
        <Typography variant="h6" gutterBottom>
          Images
        </Typography>
        <ImageUpload images={form.images} setImages={(images) => setForm({ ...form, images })} />
        <Button type="submit" variant="contained" color="primary">
          Submit
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
              // Kategorileri yeniden yüklememizi sağla
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
              // Markaları yeniden yüklememizi sağla
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