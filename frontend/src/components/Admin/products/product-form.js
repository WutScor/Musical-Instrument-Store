import React, { useState, useEffect, useContext } from 'react';
import { TextField, Button, Box, Typography, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/authContext';

const ProductForm = ({ product = null }) => {
  const context = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    additional_information: '',
    category_id: 0,
    quantity: 0,
    price: '',
    release_year: '',
    image: null,
  });
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch categories when component mounts
    const fetchCategories = async () => {
      try {
        const response = await fetch('/categories', {
          method: 'GET',
        });
        const data = await response.json();
        if (response.ok) {
          setCategories(data.data);
          if (!product) {
            console.log("Cat: ", data.data[0]);
            setFormData((prev) => ({ ...prev, category_id: data.data[0]?.id || 0 }));
          }
        } else {
          console.error(data.message || 'Failed to fetch categories');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, [product]);

  useEffect(() => {
    // Populate form data if editing an existing product
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        additional_information: product.additional_information || '',
        category_id: product.category.id || 0,
        quantity: product.quantity || 0,
        price: product.price || '',
        release_year: product.release_year || '',
        image: null,
      });
      // Set image preview if there is an existing image URL
      setImagePreview(product.image || '');
    }
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));
    // Set image preview for the selected file
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.category_id) newErrors.category_id = 'Category is required';
    if (formData.quantity < 0) newErrors.quantity = 'Quantity must be greater than or equal to 0';
    if (formData.price <= 0) newErrors.price = 'Price must be greater than 0';
    if (formData.release_year <= 0) newErrors.release_year = 'Release year must be greater than 0';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('additional_information', formData.additional_information);
    formDataToSend.append('category_id', formData.category_id);
    formDataToSend.append('quantity', formData.quantity);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('release_year', formData.release_year);
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    console.log('Form data to send at product-form.js:', formDataToSend); 

    try {
      const method = product ? 'PUT' : 'POST';
      const url = product ? `/musical_instruments/${product.id}` : '/musical_instruments';

      if (!context.token) {
        console.log('Token is missing or expired');
        return;
      }
      const response = await fetch(url, {
        method,
        body: formDataToSend,
        headers: {
          'Authorization': `Bearer ${context.token}`,
        },
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error('Error response:', errorMessage);
        throw new Error(errorMessage);
      }

      const data = await response.json();
      navigate('/admin/products');
    } catch (error) {
      console.error('Error saving product:', error.message);
    }
  };

  return (
    <Box>
      <Typography mb={3}>
        <strong>Products &gt; </strong>
        {product ? 'Edit Product' : 'Add New Product'}
      </Typography>
      <form onSubmit={handleSubmit}>
        {/* Image Preview and Upload */}
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          style={{
            width: '80%', // Khung preview rộng hơn
            maxWidth: '500px', // Đảm bảo không quá lớn
            aspectRatio: '16/9', // Cố định tỉ lệ khung
            border: '2px dashed #ccc',
            borderRadius: '10px',
            backgroundColor: '#EDEDED',
            margin: 'auto',
            marginBottom: '20px',
            overflow: 'hidden',
          }}
        >
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Product Preview"
              style={{
                width: 'auto',
                height: '100%', // Fit ảnh theo chiều cao
                objectFit: 'contain',
              }}
            />
          ) : (
            <Typography
              variant="body2"
              color="textSecondary"
              style={{ textAlign: 'center', fontSize: 25, padding: '10px', width: '100%' }}
            >
              No image selected
            </Typography>
          )}
        </Box>


        {/* Image Upload */}
        <Box mt={2} display="flex" justifyContent="center">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
            id="product-image-upload"
          />
          <label htmlFor="product-image-upload">
            <Button
              variant="outlined"
              component="span"
              sx={{
                borderColor: '#B97A04',
                color: '#B97A04',
                '&:hover': {
                  borderColor: '#B97A04',
                  backgroundColor: '#FFE6CD',
                },
              }}
            >
              Browse
            </Button>
          </label>
        </Box>


        {/* Product Fields */}
        <TextField
          label="Product Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          error={!!errors.name}
          helperText={errors.name}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          error={!!errors.description}
          helperText={errors.description}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Additional Information"
          name="additional_information"
          value={formData.additional_information}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          select
          label="Category"
          name="category_id"
          value={formData.category_id || 0}
          onChange={handleInputChange}
          error={!!errors.category_id}
          helperText={errors.category_id}
          fullWidth
          margin="normal"
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Quantity"
          name="quantity"
          type="number"
          value={formData.quantity}
          onChange={handleInputChange}
          error={!!errors.quantity}
          helperText={errors.quantity}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Price"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleInputChange}
          error={!!errors.price}
          helperText={errors.price}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Release Year"
          name="release_year"
          type="number"
          value={formData.release_year}
          onChange={handleInputChange}
          error={!!errors.release_year}
          helperText={errors.release_year}
          fullWidth
          margin="normal"
        />
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button 
            type="submit" 
            variant="contained" 
            sx={{
              backgroundColor: '#FFE6CD',
              color: '#B97A04',
              '&:hover': {
                backgroundColor: '#FFD2A5',
              },}}
          >
            {product ? 'Save Changes' : 'Add Product'}
          </Button>
          <Button 
            variant="outlined" 
            onClick={() => navigate('/admin/products')}
            sx={{
              borderColor: '#B97A04',
              color: '#B97A04',
              '&:hover': {
                borderColor: '#B97A04',
                backgroundColor: '#FFE6CD',
              },}}
          >
            Cancel
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ProductForm;
