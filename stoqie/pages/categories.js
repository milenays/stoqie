// pages/categories.js
import { useState } from 'react';
import CategoryForm from '../components/CategoryForm';
import CategoryList from '../components/CategoryList';

export default function CategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSave = () => {
    setSelectedCategory(null);
  };

  return (
    <div>
      <h1>Category Management</h1>
      <CategoryForm category={selectedCategory} onSave={handleSave} />
      <CategoryList />
    </div>
  );
}