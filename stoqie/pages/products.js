// pages/products.js
import { useRouter } from 'next/router';
import { Container, Button } from '@mui/material';
import ProductListWithFilter from '../components/ProductListWithFilter';

export default function ProductsPage() {
  const router = useRouter();

  return (
    <Container>
      <h1>Product Management</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={() => router.push('/add-product')}
      >
        Add Product
      </Button>
      <ProductListWithFilter />
    </Container>
  );
}