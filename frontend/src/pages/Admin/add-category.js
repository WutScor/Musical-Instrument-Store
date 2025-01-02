import React from 'react';
import CategoryForm from '../../components/Admin/category/category-form';

const AddCategory = () => {
  return (
    <div>
      <h2 style={{ fontWeight: 'bold' }}>Add New Product</h2>
      <CategoryForm />
    </div>
  );
};

export default AddCategory;