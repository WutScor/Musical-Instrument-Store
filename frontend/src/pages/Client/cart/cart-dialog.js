import React, { useContext, useEffect, useState } from "react";
import { Button, Dialog, Box, Pagination } from "@mui/material";
import { CartContext } from "../../../context/cartContext";
import { AuthContext } from "../../../context/authContext";
import { BsBagX } from "react-icons/bs";
import CDialogComponent from "../../../components/Client/cart/dialog/cdialog-component";
import NoticeDialog from "../../../components/Client/cart/notice-dialog";
import { Link, useNavigate } from "react-router-dom";

const CartDialog = () => {

    const context = useContext(CartContext);
    const authContext = useContext(AuthContext);
    const { token } = authContext;
    const [notice, setNotice] = useState({ open: false, message: "" });
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [cartID, setCartID] = useState();
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    // Lấy sản phẩm trong session
    useEffect(() => {
        const storedCart = JSON.parse(sessionStorage.getItem("cart")) || [];
        setCartItems(storedCart);
    }, []);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const getCartItems = async () => {
        if (authContext.user && authContext.user.id) {
            const userID = authContext.user.id;
            try {
                // Hiển thị dữ liệu
                const params = new URLSearchParams({
                    page: page || 1,
                    limit: 1
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
                    // -----------------------------------------------
                    // Sau khi cập nhật, xóa dữ liệu trong session
                    sessionStorage.removeItem("cart");
                }

                setCartItems(newItems);

            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        }
    };

    useEffect(() => {
        if (authContext.user && authContext.user.id) {
            getCartItems();
        }
        else {
            const storedCart = JSON.parse(sessionStorage.getItem("cart")) || [];
            setCartItems(storedCart);
            setTotalPages(0);
            setPage(1);
        }
    }, [authContext.user, page]);

    const checkUserToCheckout = () => {
        if (!token) {
            setNotice({ open: true, message: "You need to login to checkout!" });
        }
        else {
            navigate('/checkout');
        }
    }

    const closeNotice = () => {
        setNotice({ open: false, message: "" });
        context.setIsOpenCart(false);
    }

    const onLink = () => {
        navigate('/auth/signin');
    }

    return (
        <>
            <Dialog open={context.isOpenCart} className="cart-dialog" onClose={() => context.setIsOpenCart(false)}>
                <div className="pad-25">
                    <div className="d-flex justify-content-between align-items-center">
                        <h3>Shopping Cart</h3>
                        <Button onClick={() => context.setIsOpenCart(false)}><BsBagX /></Button>
                    </div>
                    <hr />
                    <div className="d-flex flex-column mt-5">
                        <CDialogComponent products={cartItems} cartId={cartID} />
                    </div>
                </div>
                <Box display="flex" justifyContent="center" mt={3}>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handlePageChange}
                        sx={{
                            '& .Mui-selected': {
                                backgroundColor: '#FFD2A5',  // Màu nền khi chọn trang
                                color: '#B97A04',  // Màu chữ khi chọn trang
                                fontSize: '0.9rem',
                            },
                            '& .MuiPaginationItem-root': {
                                color: '#B97A04',  // Màu chữ mặc định
                                fontSize: '0.9rem',
                            },
                        }}
                    />
                </Box>
                <hr className="mt-5 mb-0" />
                <div className="pad-25">
                    <div className="d-flex justify-content-around align-items-center btn-grp">
                        <Link to={'/cart'}><Button onClick={() => context.setIsOpenCart(false)}>Cart</Button></Link>
                        <Link><Button onClick={checkUserToCheckout}>Checkout</Button></Link>
                    </div>
                </div>
            </Dialog>
            <NoticeDialog open={notice.open} message={notice.message} onClose={closeNotice} onLink={onLink} button1={"Cancel"} button2={"Login"} />
        </>
    )
}

export default CartDialog;