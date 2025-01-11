import React, { useState, useEffect, useContext } from 'react';
import { AiOutlineSearch, AiOutlinePlus, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'; 
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Box,
    IconButton,
    Pagination,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material"; 
import { AuthContext } from '../../context/authContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OrdersPage = () => {
    const context = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
    const navigate = useNavigate();
    const [expandedRow, setExpandedRow] = useState(null);

    const toggleRow = (orderId) => {
        setExpandedRow((prev) => (prev === orderId ? null : orderId));
    };

    const fetchOrders = async () => {
        try {
            console.log('context', context);
            const params = new URLSearchParams({
                page: page || 1,
                limit: 5,
                userId: context.user.id,
            });

            const response = await fetch(`/orders?${params.toString()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${context.token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Error fetching orders: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();

            setOrders(data.items);
            console.log('orders', data.items);
            setPagination({
                page: data.pagination.page,
                totalPages: data.pagination.totalPages,
            });
            console.log('pagination', data.pagination);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    }

    useEffect(() => {
        if (context.user && page) {
            fetchOrders();
        }
    }, [context.user, page]);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    return (
        <div className='container'>
            <Box mt={3} mb={3} display="flex" justifyContent="center">
                <Typography variant="h4">My Orders</Typography>
            </Box>
            <Box>
                {/* Navbar: Search bar và Add Product */}
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                    {/* Search Bar */}
                    {/* <TextField
                        variant="outlined"
                        placeholder="Search..."
                        size="small"
                        value={search}
                        onChange={handleSearchChange}
                        InputProps={{
                            startAdornment: <AiOutlineSearch style={{marginRight: '8px'}} />,
                        }}
                        fullWidth
                    /> */}

                    {/* Add Product Button */}
                    {/* <Button 
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
                        onClick={handleAddAccount}
                    >
                        Add User
                    </Button> */}
                </Box>

                {/* Table */}
                <TableContainer>
                    <Table>
                        {/* Table Head */}
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    sx={{ backgroundColor: "#FFD2A5", fontWeight: "bold", width: "20%" }}
                                >
                                    Order ID
                                </TableCell>
                                <TableCell
                                    sx={{ backgroundColor: "#FFD2A5", fontWeight: "bold", width: "30%" }}
                                >
                                    Date
                                </TableCell>
                                <TableCell
                                    sx={{ backgroundColor: "#FFD2A5", fontWeight: "bold", width: "20%" }}
                                >
                                    Total Price
                                </TableCell>
                                <TableCell
                                    sx={{ backgroundColor: "#FFD2A5", fontWeight: "bold", width: "10%" }}
                                >
                                    Details
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        {/* Table Body */}
                        <TableBody>
                            {orders.map((order) => (
                                <React.Fragment key={order.id}>
                                    {/* Main Order Row */}
                                    <TableRow>
                                        <TableCell sx={{ backgroundColor: "#F5F5F5", fontWeight: "bold" }}>
                                            {order.id}
                                        </TableCell>
                                        <TableCell sx={{ backgroundColor: "#F5F5F5" }}>
                                            {new Date(order.order_date).toLocaleDateString("en-GB")}
                                        </TableCell>
                                        <TableCell sx={{ backgroundColor: "#F5F5F5" }}>
                                            ${order.total_price}
                                        </TableCell>
                                        <TableCell sx={{ backgroundColor: "#F5F5F5" }}>
                                            <IconButton onClick={() => toggleRow(order.id)}>
                                                {expandedRow === order.id ? <ExpandLess /> : <ExpandMore />}
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                    {expandedRow === order.id && (
                                        <TableRow>
                                            <TableCell colSpan={4} sx={{ padding: 0 }}>
                                                <Box sx={{ padding: 2 }}>
                                                    {order.items.map((item) => (
                                                        <Box
                                                            key={item.id}
                                                            display="flex"
                                                            alignItems="center"
                                                            sx={{
                                                                marginBottom: 2,
                                                                borderBottom: "1px solid #ddd",
                                                                paddingBottom: 2,
                                                            }}
                                                        >
                                                            <img
                                                                src={item.image}
                                                                alt={item.name}
                                                                width={50}
                                                                height={50}
                                                                style={{
                                                                    objectFit: "contain",
                                                                    borderRadius: "8px",
                                                                    marginRight: "16px",
                                                                }}
                                                            />
                                                            <div className='order-item row w-100'>
                                                                <div className='col-md-6'>
                                                                    <Typography sx={{ fontWeight: "bold" }}>
                                                                        {item.name}
                                                                    </Typography>
                                                                </div>
                                                                <div className='col-md-6'>
                                                                    <div className='row'>
                                                                        <div className='col-md-2'></div>
                                                                        <div className='col-md-10'>
                                                                            <Typography className='ms-typo'>${item.price} <strong>x</strong> {item.quantity}</Typography>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Box>
                                                    ))}
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </React.Fragment>
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
            </Box>
        </div>
    )
};

export default OrdersPage;
