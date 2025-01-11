import React, { useState, useEffect, useContext } from 'react';
import { TextField, Button, Box, Typography, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/authContext';

const UserEditPage = () => {
    const context = useContext(AuthContext);
    const user = context.user;
    const [formData, setFormData] = useState({
        username: user.username || '',
        avatar: null,
    });
    const [errors, setErrors] = useState({});
    const [imagePreview, setImagePreview] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Chỉ chạy khi user.avatar thay đổi
        setFormData({
            username: user.username || '',
            avatar: null,
        });
    
        setImagePreview(user.avatar || '');
    }, [user.avatar]); // Thêm mảng phụ thuộc để chỉ chạy khi `user.avatar` thay đổi
    

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData((prev) => ({
          ...prev,
          avatar: file,
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        console.log('Form data:', formData);
        formDataToSend.append('username', formData.username);
        if (formData.avatar) {
          formDataToSend.append('avatar', formData.avatar);
        }

        console.log('Form data to send:', formDataToSend);
    
        try {
          const method = 'PUT';
          const url = `/users/${user.id}`;
          console.log('Sending request:', method, url);
    
          if (!context.token) {
            console.log('Token is missing or expired');
            return;
          }
    
          const response = await fetch(url, {
            method,
            body: formDataToSend,
            headers: {
              'Authorization': `Bearer ${context.token}`,
            }
          });
    
          if (!response.ok) {
            const errorMessage = await response.text();
            console.error('Error response:', errorMessage);
            throw new Error(errorMessage);
          }
    
          const data = await response.json();
          console.log('Account saved:', data);
          navigate('/user');
        } catch (error) {
          console.error('Error saving account:', error.message);
        }
      };

    return (
        <div>
            <h1>User Edit</h1>
            <Box>
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
                    <Box mt={2} display="flex" justifyContent="space-between">
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
                        Save Changes
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => navigate('/user')}
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
                </Box>
        </div>
    )
}

export default UserEditPage;