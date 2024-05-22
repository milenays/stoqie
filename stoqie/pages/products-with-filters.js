// pages/products-with-filters.js
import { useState } from 'react';
import ProductForm from '../components/ProductForm';
import ProductListWithFilter from '../components/ProductListWithFilter';

export default function ProductsWithFiltersPage() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleSave = () => {
    setSelectedProduct(null);
  };

  return (
    <div>
      <h1>Product Management with Filters</h1>
      <ProductForm product={selectedProduct} onSave={handleSave} />
      <ProductListWithFilter />
    </div>
  );
}