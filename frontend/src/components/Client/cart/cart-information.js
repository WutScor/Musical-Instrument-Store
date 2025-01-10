import CartTotal from './cart-total';
import CartItems from './cart-items-information';
import CartAds from './cart-ads';
import CartIntro from './cart-intro';
import { AuthContext } from '../../../context/authContext';
import { useContext } from 'react';
import React, { useEffect, useState } from 'react';
import { Box, Pagination } from '@mui/material';

const CartInformation = () => {
    const context = useContext(AuthContext);
    const { token } = context;
    const [cartItems, setCartItems] = useState([]);
    const [currentItems, setCurrentItems] = useState([]);
    const [cartID, setCartID] = useState();
    // const [storedCart, setStoredCart] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [notice, setNotice] = useState({ show: false, message: '', color: '' });

    const showNotice = (isShow, message, color) => {
        setNotice({ show: isShow, message: message, color: color });
        setTimeout(() => {
            setNotice({ show: false, message: '', color: '' });
        }, 2000);
    };

    useEffect(() => {
        const storedCart = JSON.parse(sessionStorage.getItem("cart")) || [];
        setCartItems(storedCart);
    }, []);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const getCartItems = async () => {
        if (context.user && context.user.id) {
            const userID = context.user.id;
            try {
                // Hiển thị dữ liệu
                const params = new URLSearchParams({
                    page: page || 1,
                    limit: 3
                });
                const response = await fetch(`/carts?${params.toString()}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        "user_id": userID
                    })
                });

                if (!response.ok) {
                    throw new Error(`Error fetching cart items: ${response.status} - ${response.statusText}`);
                }
                const data = await response.json();
                console.log('Cart data:', data);
                setCartID(data.items.cart_id);
                setTotalPages(data.pagination.totalPages);

                const newItems = data.items.items.map(item => ({
                    id: item.musical_instrument.id,
                    name: item.musical_instrument.name,
                    quantity: item.quantity,
                    price: item.musical_instrument.price,
                    image: item.musical_instrument.image,
                    description: item.musical_instrument.description,
                    additional_information: item.musical_instrument.additional_information,
                    available_quantity: item.musical_instrument.available_quantity,
                    release_year: item.musical_instrument.release_year
                }));
                const storedCart = JSON.parse(sessionStorage.getItem("cart")) || [];

                if (storedCart.length !== 0) {
                    storedCart.forEach(storedItem => {
                        const existingItem = newItems.find(updatedItem => updatedItem.id === storedItem.id);
                        if (existingItem) {
                            // Cập nhật số lượng sản phẩm bằng với số lượng trong session
                            existingItem.quantity = storedItem.quantity;
                        }
                        else {
                            newItems.push(storedItem);
                        }
                    });

                    // Update dữ liệu vào database
                    const updateItems = newItems.map(item => ({
                        "itemId": item.id,
                        "quantity": item.quantity
                    }));

                    const updateResponse = await fetch(`/carts/${cartID}/items`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`
                        },
                        body: JSON.stringify(updateItems)
                    });

                    if (!updateResponse.ok) {
                        throw new Error(`Error updating cart items: ${updateResponse.status} - ${updateResponse.statusText}`);
                    }
                    console.log('Update cart items:', updateResponse);

                    // -----------------------------------------------
                    // Sau khi cập nhật, xóa dữ liệu trong session
                    sessionStorage.removeItem("cart");
                }

                setCartItems(newItems);
                // setCurrentItems(newItems.slice(0, 3));

            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        }
    };

    useEffect(() => {
        if (context.user && context.user.id) {
            getCartItems();
        }
    }, [context.user, page]);

    return (
        <>
            {notice.show && (
                <div className="notification-bar" style={{ background: notice.color }}>{notice.message}</div>
            )}
            <CartIntro />
            <div className="cart-information gap-4">
                <div className='w-100'>
                    <CartItems cartItems={cartItems} setCartItems={setCartItems} showNotice={showNotice} cartID={cartID} />
                    <Box display="flex" justifyContent="center" mt={3}>
                        <Pagination
                            count={totalPages}
                            page={page}
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
                </div>
                <CartTotal cartItems={cartItems} />
            </div>
            <CartAds />
        </>
    )
}

export default CartInformation;