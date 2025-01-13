import React, { useState, useEffect, useContext } from 'react';
import { TextField, Button, Box, Typography, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/authContext';

const AccountForm = ({ user = null }) => {
  const context = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    isAdmin: false,
    avatar: null,
  });
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState('');
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
        const response = await fetch('/users', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${context.token}`,
            },
        });
        const data = await response.json();
        console.log("UUUUUUUUU---: ", data);
        if (response.ok) {
            setUsers(data.data);
        } else {
            console.error(data.message || 'Failed to fetch users');
        }
    } catch (error) {
        console.error('Error fetching users:', error);
    }
  }

  useEffect(() =>  {
    fetchUsers();
  }, []);

  useEffect(() =>  {
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        password: '', // Password is not pre-filled for security reasons
        isAdmin: user.isAdmin || false,
        avatar: null,
      });

      setImagePreview(user.avatar  || '');
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'isAdmin' ? value === 'true' : value,
    }));
  };

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

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Username is required';
    //check if username already exists
    console.log("USERSSSS: ", users);
    if (users.find((u) => u.username === formData.username && u.username !== user?.username)) {
      newErrors.username = 'Username already exists';
    }
    if (!formData.email) newErrors.email = 'Email is required';
    //check if email already exists
    if (users.find((u) => u.email === formData.email && u.email !== user?.email)) {
      newErrors.email = 'Email already exists';
    }
    if (!user && !formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formDataToSend = new FormData();
    formDataToSend.append('username', formData.username);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('isAdmin', formData.isAdmin);
    if (formData.password) {
      formDataToSend.append('password', formData.password);
    }
    if (formData.avatar) {
      formDataToSend.append('avatar', formData.avatar);
    }

    console.log('Form data to send at account form:', formDataToSend);

    try {
      const method = user ? 'PUT' : 'POST';
      const url = user ? `/users/${user.id}` : '/users';

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
      console.log('Saved account:', data);
      navigate('/admin/accounts');
    } catch (error) {
      console.error('Error saving account:', error.message);
    }
  };

  return (
    <Box>
      <Typography mb={3}>
        <strong>Accounts &gt; </strong>
        {user ? 'Edit Account' : 'Add New Account'}
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
        <TextField
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          error={!!errors.username}
          helperText={errors.username}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          error={!!errors.email}
          helperText={errors.email}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
          error={!!errors.password}
          helperText={errors.password}
          fullWidth
          margin="normal"
        />
        <TextField
          select
          label="Role"
          name="isAdmin"
          value={formData.isAdmin.toString()}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        >
          <MenuItem value="true">Admin</MenuItem>
          <MenuItem value="false">Client</MenuItem>
        </TextField>
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
            {user ? 'Save Changes' : 'Add Account'}
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate('/admin/accounts')}
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
  );
};

export default AccountForm;
