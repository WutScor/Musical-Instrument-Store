import React, { useState, useEffect, useContext } from 'react';
import { AiOutlineSearch, AiOutlinePlus, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'; 
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Pagination, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'; 
import { Box } from '@mui/system'; 
import { AuthContext } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import AlertMessage from '../../components/Admin/alert-message';

const ProductPage = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [alert, setAlert] = useState({ message: '', color: '' });
  const [deleteConfirm, setDeleteConfirm] = useState({open: false, productId: null});

  const fetchProducts = async () => {
    try {
      const searchQuery = search || '';
      const params = new URLSearchParams({
        page: page || 1,
        limit: 5,
        search: searchQuery,
      });
  
      const response = await fetch(`/musical_instruments?${params.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${context.token}`, // Truyền token từ AuthContext
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error fetching products: ${response.status} - ${response.statusText}`);
      }
  
      const data = await response.json();
  
      // Cập nhật state
      setProducts(data.items);
      setPagination({
        page: data.pagination.page,
        totalPages: data.pagination.totalPages,
      });
      console.log('pagination', data.pagination);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  

  useEffect(() => {
    fetchProducts();
  }, [search, page]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);  
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const showAlert = (message, color) => {
    setAlert({ message, color });
  
    setTimeout(() => {
      setAlert({ message: '', color: '' });
    }, 3000);
  };

  const confirmDelete = (productId) => {
    setDeleteConfirm({open: true, productId});
  }

  const handleCloseDialog = () => {
    setDeleteConfirm({open: false, productId: null});
  }

  const handleDelete = async (productId) => {
    try {
      console.log(context);
      const token = context.token;
      console.log("Access Token: ", token);
  
      if (!token) {
        showAlert('User is not authenticated.', 'red');
        return;
      }
  
      const response = await fetch(`/musical_instruments/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
        const data = await response.json();
  
      if (response.status === 200) {
        setProducts(products.filter((product) => product.id !== productId));
        showAlert(data.message || 'Product deleted successfully!', 'green'); 
        fetchProducts();     
      }
      else {
        showAlert(data.message || 'Failed to delete product.', 'red');      
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      showAlert('An error occurred while deleting the product.', 'red');    
    }
  };

  const handleEdit = async (product) => {
    navigate(`/admin/products/edit`, { state: { product } });
  };

  const handleAddProduct = () => {
    navigate(`/admin/products/add`);
  };
  

  return (
    <Box>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <h2 style={{ fontWeight: 'bold' }}>Products</h2>
        <Typography variant="h6">Hi, {context.user ? context.user.username : ''} </Typography>
      </Box>

      {/* Navbar: Search bar và Add Product */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        {/* Search Bar */}
        <TextField
          variant="outlined"
          placeholder="Search..."
          size="small"
          value={search}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: <AiOutlineSearch style={{marginRight: '8px'}} />,
          }}
          fullWidth
        />

        {/* Add Product Button */}
        <Button 
          startIcon={<AiOutlinePlus />} 
          sx={{ 
            width: '180px',
            marginLeft: '8px',
            backgroundColor: '#FFE6CD', 
            color: '#B97A04', 
            paddingX: 3,
            paddingY: 1,
            textTransform: 'none', // Tắt chữ in hoa
            boxShadow: 'none', // Bỏ shadow
            border: '0.5px solid #B97A04', // Thêm border
            '&:hover': {
              backgroundColor: '#FFD18D',
            }
          }}
          onClick={handleAddProduct}
        >
          Add Product
        </Button>
      </Box>

      {/* Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ backgroundColor: '#FFD2A5', fontWeight: 'bold', borderTopLeftRadius: '8px' }}>Product</TableCell>
              <TableCell sx={{ backgroundColor: '#FFD2A5', fontWeight: 'bold' }}>Category</TableCell>
              <TableCell sx={{ backgroundColor: '#FFD2A5', fontWeight: 'bold' }}>Quantity</TableCell>
              <TableCell sx={{ backgroundColor: '#FFD2A5', fontWeight: 'bold' }}>Price</TableCell>
              <TableCell sx={{ backgroundColor: '#FFD2A5', fontWeight: 'bold' }}>Year</TableCell>
              <TableCell sx={{ backgroundColor: '#FFD2A5', fontWeight: 'bold', borderTopRightRadius: '8px' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      width={50} 
                      height={50} 
                      style={{ 
                        objectFit: 'contain', 
                        borderRadius: '8px', 
                        marginRight: '8px',
                        width: '50px', 
                        height: '50px' 
                      }} 
                    />                    
                    {product.name}
                  </Box>
                </TableCell>
                <TableCell>{product.category.name}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.release_year}</TableCell>
                <TableCell>
                  <Button startIcon={<AiOutlineEdit />} 
                    size="small" 
                    color="primary"
                    onClick={() => handleEdit(product)}
                    sx={{
                      minWidth: 'auto',
                      marginRight: 1,
                      padding: '4px 8px',
                    }} />
                  <Button startIcon={<AiOutlineDelete style={{ color: '#E92020' }}/>} 
                    size="small" 
                    color="secondary" 
                    onClick={() => confirmDelete(product.id)}
                    sx={{
                      minWidth: 'auto',
                      padding: '4px 8px',
                    }}/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box display="flex" justifyContent="center" mt={3}>
        <Pagination
          count={pagination.totalPages}
          page={pagination.page}
          onChange={handlePageChange}
          sx={{
            '& .Mui-selected': {
              backgroundColor: '#FFD2A5',  // Màu nền khi chọn trang
              color: '#B97A04',  // Màu chữ khi chọn trang
            },
            '& .MuiPaginationItem-root': {
              color: '#B97A04',  // Màu chữ mặc định
            },
          }}
        />
      </Box>
      <AlertMessage message={alert.message} color={alert.color} />

      {/* Dialog Confirm Delete */}
      <Dialog
        open={deleteConfirm.open}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this product? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleDelete(deleteConfirm.productId);
              handleCloseDialog();
            }}
            color="error"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductPage;
