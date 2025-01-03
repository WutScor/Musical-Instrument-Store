import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import ProductForm from '../../components/Admin/products/product-form';

const EditProduct = () => {
  const location = useLocation();
  const { product } = location.state || {}; 

  return (
    <div>
      <h2 style={{ fontWeight: 'bold' }}>Edit Product</h2>
      {product ? <ProductForm product={product} /> : <div>Loading...</div>}
    </div>
  );
};

export default EditProduct;