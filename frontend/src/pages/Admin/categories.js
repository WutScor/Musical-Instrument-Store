import { useState, useEffect, useContext } from "react";
import { Box, Typography, TextField, Button, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Pagination } from "@mui/material";
import { AuthContext } from "../../context/authContext";
import { AiOutlineSearch, AiOutlinePlus, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import AlertMessage from "../../components/Admin/alert-message";

const CategoryPage = () => {
  const context = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [alert, setAlert] = useState({ message: '', color: '' });
  const [productCount, setProductCount] = useState({});

  const fetchCategories = async () => {
    try {
      const searchQuery = search || '';
      const params = new URLSearchParams({
        page: page || 1,
        limit: 5,
        search: searchQuery,
      });
      const response = await fetch(`/categories?${params.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${context.token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching categories: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data);

      setCategories(data.items);
      setPagination({
        page: data.pagination.page,
        totalPages: data.pagination.totalPages,
      });
      // Cập nhật số lượng sản phẩm của mỗi category
      const counts = {};
      for(const category of data.items) {
        counts[category.name] = await calculateProduct(category.name);
      }
      setProductCount(counts);
    }
    catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Tính toán số lượng sản phẩm của mỗi category
  const calculateProduct = async (category) => {
    try {
      let count = 0;
      const response = await fetch('/musical_instruments', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${context.token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching products: ${response.status} - ${response.statusText}`);
      }
      const data = await response.json();
      console.log(data);
      if (data.items) {
        data.items.forEach((product) => {
          if (product.category.name === category) {
            count++;
          }
        });
      }
      return count;
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  console.log(productCount);

  useEffect(() => {
    fetchCategories();
  }, [search, page]);

  const handleSearchCategory = (e) => {

  };

  const handlePageChange = (e, value) => {
    setPage(value);
  };


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
          onChange={handleSearchCategory}
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
        >
          Add Category
        </Button>
      </Box>

      {/* Content Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ backgroundColor: '#FFD2A5', fontWeight: 'bold', borderTopLeftRadius: '8px' }}>No</TableCell>
              <TableCell sx={{ backgroundColor: '#FFD2A5', fontWeight: 'bold' }}>Category</TableCell>
              <TableCell sx={{ backgroundColor: '#FFD2A5', fontWeight: 'bold' }}> </TableCell>
              <TableCell sx={{ backgroundColor: '#FFD2A5', fontWeight: 'bold' }}>Products Quantity</TableCell>
              <TableCell sx={{ backgroundColor: '#FFD2A5', fontWeight: 'bold', borderTopRightRadius: '8px' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category, index) => (
              <TableRow key={category.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>
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
                <TableCell>{productCount[category.name] || 0}</TableCell>
                <TableCell>
                  <Button startIcon={<AiOutlineEdit />}
                    size="small"
                    color="primary"

                    sx={{
                      minWidth: 'auto',
                      marginRight: 1,
                      padding: '4px 8px',
                    }} />
                  <Button startIcon={<AiOutlineDelete style={{ color: '#E92020' }} />}
                    size="small"
                    color="secondary"

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
    </Box>
  );
};

export default CategoryPage;