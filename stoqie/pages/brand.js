// pages/brands.js
import { useState } from 'react';
import BrandForm from '../components/BrandForm';
import BrandList from '../components/BrandList';

export default function BrandsPage() {
  const [selectedBrand, setSelectedBrand] = useState(null);

  const handleSave = () => {
    setSelectedBrand(null);
  };

  return (
    <div>
      <h1>Brand Management</h1>
      <BrandForm brand={selectedBrand} onSave={handleSave} />
      <BrandList />
    </div>
  );
}