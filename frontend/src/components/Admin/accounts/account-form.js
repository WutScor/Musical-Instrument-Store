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
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        password: '', // Password is not pre-filled for security reasons
        isAdmin: user.isAdmin || false,
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'isAdmin' ? value === 'true' : value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!user && !formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const method = user ? 'PUT' : 'POST';
      const url = user ? `/users/${user.id}` : '/users';

      if (!context.token) {
        console.log('Token is missing or expired');
        return;
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${context.token}`,
        },
        body: JSON.stringify(formData),
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
