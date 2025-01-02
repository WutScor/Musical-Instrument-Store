import React from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import CategoryForm from '../../components/Admin/category/category-form';
const EditCategory = () => {
  const location = useLocation();
  const { category } = location.state || {}; 

  return (
    <div>
      <h2 style={{ fontWeight: 'bold' }}>Edit Category</h2>
      {category ? <CategoryForm category={category} /> : <div>Loading...</div>}
    </div>
  );
};

export default EditCategory;