import React from 'react';
import ProductForm from '../../components/Admin/products/product-form';

const AddProduct = () => {
  return (
    <div>
      <h2 style={{ fontWeight: 'bold' }}>Add New Product</h2>
      <ProductForm />
    </div>
  );
};

export default AddProduct;