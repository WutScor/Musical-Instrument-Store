import React, { useState, useEffect, useContext } from 'react';
import { TextField, Button, Box, Typography, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/authContext';
import AlertMessage from '../alert-message';

const CategoryForm = ({ category = null }) => {
    const context = useContext(AuthContext);
    const [formData, setFormData] = useState({
        name: '',
        // description: '',
        // additional_information: '',
        // category_id: 0,
        // quantity: 0,
        // price: '',
        // release_year: '',
        image: null,
    });
    const [categories, setCategories] = useState([]);
    const [errors, setErrors] = useState({});
    const [imagePreview, setImagePreview] = useState('');
    const [alert, setAlert] = useState({ message: '', color: '' });
    const navigate = useNavigate();

    //   useEffect(() => {
    //     // Fetch categories when component mounts
    //     const fetchCategories = async () => {
    //       try {
    //         const response = await fetch('/categories', {
    //           method: 'GET',
    //         });
    //         const data = await response.json();
    //         if (response.ok) {
    //           setCategories(data.data);
    //           if (!product) {
    //             console.log("Cat: ", data.data[0]);
    //             setFormData((prev) => ({ ...prev, category_id: data.data[0]?.id || 0 }));
    //           }
    //         } else {
    //           console.error(data.message || 'Failed to fetch categories');
    //         }
    //       } catch (error) {
    //         console.error('Error fetching categories:', error);
    //       }
    //     };

    //     fetchCategories();
    //   }, [product]);

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
                    //   if (!category) {
                    //     console.log("Cat: ", data.data[0]);
                    //     setFormData((prev) => ({ ...prev, category_id: data.data[0]?.id || 0 }));
                    //   }
                } else {
                    console.error(data.message || 'Failed to fetch categories');
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        // Populate form data if editing an existing product
        if (/*product*/ category) {
            setFormData({
                name: /*product*/category.name || '',
                // description: product.description || '',
                // additional_information: product.additional_information || '',
                // category_id: product.category.id || 0,
                // quantity: product.quantity || 0,
                // price: product.price || '',
                // release_year: product.release_year || '',
                image: null,
            });
            // Set image preview if there is an existing image URL
            setImagePreview(/*product*/category.image || '');
        }
    }, [/*product*/category]);

    const showAlert = (message, color) => {
        setAlert({ message, color });

        setTimeout(() => {
            setAlert({ message: '', color: '' });
        }, 3000);
    }

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
        // if (!formData.description) newErrors.description = 'Description is required';
        // if (!formData.category_id) newErrors.category_id = 'Category is required';
        // if (formData.quantity < 0) newErrors.quantity = 'Quantity must be greater than or equal to 0';
        // if (formData.price <= 0) newErrors.price = 'Price must be greater than 0';
        // if (formData.release_year <= 0) newErrors.release_year = 'Release year must be greater than 0';
        categories.forEach((category) => {
            if (category.name === formData.name) {
                newErrors.name = 'Category already exists';
            }
        });
        if (!formData.image) newErrors.image = 'Image is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        // formDataToSend.append('description', formData.description);
        // formDataToSend.append('additional_information', formData.additional_information);
        // formDataToSend.append('category_id', formData.category_id);
        // formDataToSend.append('quantity', formData.quantity);
        // formDataToSend.append('price', formData.price);
        // formDataToSend.append('release_year', formData.release_year);
        if (formData.image) {
            formDataToSend.append('image', formData.image);
        }

        try {
            const method = /*product*/category ? 'PUT' : 'POST';
            const url = /*product*/category ? `/categories/${/*product*/category.id}` : '/categories';

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

            showAlert(data.message || "Add category successfully", 'green');
            setTimeout(() => {
                navigate('/admin/categories');
            }, 1500);
        } catch (error) {
            console.error('Error saving product:', error.message);
            showAlert(error.message || "Error adding category", 'red');
        }
    };

    return (
        <Box>
            <Typography mb={3}>
                <strong>Categories &gt; </strong>
                {category ? 'Edit Product' : 'Add New Product'}
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
                    label="Category Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    error={!!errors.name}
                    helperText={errors.name}
                    fullWidth
                    margin="normal"
                    onClick={() => setErrors((prev) => ({ ...prev, name: '' }))}
                />
                <Box display="flex" justifyContent="space-between" style={{ marginTop: '30px' }}>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            backgroundColor: '#FFE6CD',
                            color: '#B97A04',
                            '&:hover': {
                                backgroundColor: '#FFD2A5',
                            },
                        }}
                    >
                        {category ? 'Save Changes' : 'Add Category'}
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => navigate('/admin/categories')}
                        sx={{
                            borderColor: '#B97A04',
                            color: '#B97A04',
                            '&:hover': {
                                borderColor: '#B97A04',
                                backgroundColor: '#FFE6CD',
                            },
                        }}
                    >
                        Cancel
                    </Button>
                </Box>
            </form>
            <AlertMessage message={alert.message} color={alert.color} />
        </Box>
    );
};

export default CategoryForm;
