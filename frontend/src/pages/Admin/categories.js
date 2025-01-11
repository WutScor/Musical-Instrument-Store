import { useState, useEffect, useContext } from "react";
import { Box, Typography, TextField, Button, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Pagination, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { AuthContext } from "../../context/authContext";
import { AiOutlineSearch, AiOutlinePlus, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import AlertMessage from "../../components/Admin/alert-message";
import { useNavigate } from "react-router-dom";

const CategoryPage = () => {
  const context = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [alert, setAlert] = useState({ message: '', color: '' });
  const [productCount, setProductCount] = useState({});
  const [deleteConfirm, setDeleteConfirm] = useState({open: false, categoryId: null});
  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const searchQuery = search || '';
      const params = new URLSearchParams({
        page: page || 1,
        limit: 5,
        search: searchQuery,
      });
      const [categoriesResponse, productResponse] = await Promise.all([
        fetch(`/categories?${params.toString()}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${context.token}`,
          },
        }),
        fetch('/musical_instruments', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${context.token}`,
          },
        }),
      ]);

      if (!categoriesResponse.ok) {
        throw new Error(`Error fetching categories: ${categoriesResponse.status} - ${categoriesResponse.statusText}`);
      }
      if (!productResponse.ok) {
        throw new Error(`Error fetching products: ${productResponse.status} - ${productResponse.statusText}`);
      }

      const categoriesData = await categoriesResponse.json();
      const productsData = await productResponse.json();

      console.log(categoriesData);
      console.log("--------------------")
      console.log(productsData);

      setCategories(categoriesData.items);
      setPagination({
        page: categoriesData.pagination.page,
        totalPages: categoriesData.pagination.totalPages,
      });

      // Cập nhật số lượng sản phẩm của mỗi category
      const counts = {};
      for (const category of categoriesData.items) {
        counts[category.name] = productsData.data.filter(product => product.category.name === category.name).length;
      }
      setProductCount(counts);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [search, page]);


  // API không có search => Không áp dụng được
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handlePageChange = (e, value) => {
    setPage(value);
  };

  const showAlert = (message, color) => {
    setAlert({ message, color });

    setTimeout(() => {
      setAlert({ message: '', color: '' });
    }, 3000);
  }

  // Handle xóa category
  const confirmDelete = (categoryId) => {
    setDeleteConfirm({open: true, categoryId});
  }

  const handleCloseDialog = () => {
    setDeleteConfirm({open: false, categoryId: null});
  }

  const handleDelete = async (categoryId) => {
    try {
      const token = context.token;

      if (!token) {
        showAlert('User is not authenticated.', 'red');
        return;
      }

      const response = await fetch(`/categories/${categoryId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.status === 200) {
        setCategories(categories.filter((category) => category.id !== categoryId));
        showAlert(data.message || 'Category deleted successfully', 'green');
        fetchCategories();
      }
      else {
        showAlert(data.message || 'Error deleting category', 'red');
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      showAlert('Error deleting category', 'red');
    }
  }

  const handleAddCategory = () => {
    navigate('/admin/categories/add');
  }

  const handleEditCategory = async (category) => {
    navigate('/admin/categories/edit', { state: { category } });
  }

  return (
    <Box>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" style={{ fontWeight: 'bold' }}>Categories</Typography>
        <Typography variant="h6">Hi, {context.user ? context.user.username : ''}</Typography>
      </Box>

      {/* Nav-bar - Search & Add Category */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        {/* Search */}
        <TextField
          variant="outlined"
          placeholder="Search..."
          size="small"
          value={search}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: <AiOutlineSearch style={{ marginRight: '8px' }} />,
          }}
          fullWidth
        />

        {/* Add Category */}
        <Button
          startIcon={<AiOutlinePlus />}
          sx={{
            width: '180px',
            marginLeft: '8px',
            backgroundColor: '#FFE6CD',
            color: '#B97A04',
            paddingX: 2,
            paddingY: 1,
            textTransform: 'none',
            boxShadow: 'none',
            border: '0.5px solid #B97A04',
            '&:hover': {
              backgroundColor: '#FFD18D',
            }
          }}
          onClick={handleAddCategory}
        >
          Add Category
        </Button>
      </Box>

      {/* Content Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ backgroundColor: '#FFD2A5', fontWeight: 'bold', borderTopLeftRadius: '8px' }}>No</TableCell>
              <TableCell align="center" sx={{ backgroundColor: '#FFD2A5', fontWeight: 'bold' }}>Category</TableCell>
              <TableCell align="center" sx={{ backgroundColor: '#FFD2A5', fontWeight: 'bold' }}> </TableCell>
              <TableCell align="center" sx={{ backgroundColor: '#FFD2A5', fontWeight: 'bold' }}>Products Quantity</TableCell>
              <TableCell align="center" sx={{ backgroundColor: '#FFD2A5', fontWeight: 'bold', borderTopRightRadius: '8px' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category, index) => (
              <TableRow key={category.id}>
                <TableCell align="center">{(page - 1) * 5 + index + 1}</TableCell>
                <TableCell align="center">{category.name}</TableCell>
                <TableCell align="center">
                  <img
                    src={category.image}
                    width={50}
                    height={50}
                    style={{
                      objectFit: 'contain',
                      borderRadius: '8px',
                      marginRight: '8px',
                      width: '50px',
                      height: '50px'
                    }} ></img>
                </TableCell>
                <TableCell align="center">{productCount[category.name] || 0}</TableCell>
                <TableCell align="center">
                  <Button startIcon={<AiOutlineEdit />}
                    size="small"
                    color="primary"
                    onClick={() => handleEditCategory(category)}
                    sx={{
                      minWidth: 'auto',
                      marginRight: 1,
                      padding: '4px 8px',
                    }} />
                  <Button startIcon={<AiOutlineDelete style={{ color: '#E92020' }} />}
                    size="small"
                    color="secondary"
                    onClick={() => confirmDelete(category.id)}
                    sx={{
                      minWidth: 'auto',
                      padding: '4px 8px',
                    }} />
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
            Are you sure you want to delete this category? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleDelete(deleteConfirm.categoryId);
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

export default CategoryPage;