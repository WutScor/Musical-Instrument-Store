import CartTotal from './cart-total';
import CartItems from './cart-items-information';
import CartAds from './cart-ads';
import CartIntro from './cart-intro';
import { AuthContext } from '../../../context/authContext';
import { useContext } from 'react';
import React, { useEffect, useState } from 'react';

const CartInformation = () => {
    const context = useContext(AuthContext);
    const { token } = context;
    const [cartItems, setCartItems] = useState([]);
    const [storedCart, setStoredCart] = useState([]);
    const [page, setPage] = useState(1);
    console.log("User: ", context.user);
    // console.log("USer ID: ", context.user.id);

    // const storedCart = JSON.parse(sessionStorage.getItem("cart")) || [];
    // setCartItems(storedCart);

    useEffect(() => {
        const storedCart = JSON.parse(sessionStorage.getItem("cart")) || [];
        setStoredCart(storedCart);
        setCartItems(storedCart);
    }, []);

    const getCartItems = async () => {
        if (context.user && context.user.id) {
            try {
                const params = new URLSearchParams({
                    page: page || 1,
                    limit: 5
                });
                console.log('Params:', params.toString());
                const response = await fetch(`/carts?${params.toString()}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        // lấy dữ liệu trong context
                        "user_id": context.user.id
                    })
                });

                console.log('Response:', response);

                if (!response.ok) {
                    throw new Error(`Error fetching cart items: ${response.status} - ${response.statusText}`);
                }
                const data = await response.json();
                console.log('Cart items in data:', data);
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
                console.log('New items:', newItems);
                const storedCart = JSON.parse(sessionStorage.getItem("cart")) || [];
                const updatedItems = [...newItems];

                storedCart.forEach(storedItem => {
                    const existingItem = updatedItems.find(updatedItem => updatedItem.id === storedItem.id);
                    if(existingItem) {
                        // Cập nhật số lượng sản phẩm bằng với số lượng trong session
                        existingItem.quantity = storedItem.quantity;
                    }
                    else {
                        updatedItems.push(storedItem);
                    }
                });

                // Sau khi kiểm tra, cập nhật lại cartItems
                setCartItems(updatedItems);

                // Sau đó, cập nhật vào database


                // -----------------------------------------------

                // setCartItems((prevItems) => {
                //     const updatedItems = [...prevItems];
    
                //     newItems.forEach(newItem => {
                //         // Kiểm tra nếu item đã tồn tại trong cartItems hay chưa
                //         if (!updatedItems.some(existingItem => existingItem.id === newItem.id)) {
                //             updatedItems.push(newItem);
                //         }
                //     });
    
                //     return updatedItems;
                // });
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        }
        // else {
        //     const storedCart = JSON.parse(sessionStorage.getItem("cart")) || [];
        //     setCartItems(storedCart);
        // }
    };

    useEffect(() => {
        if (context.user && context.user.id) {
            getCartItems();
        }
    }, [context.user, page]);
    // console.log('Cart items:', cartItems);

    return (
        <>
            <CartIntro />
            <div className="cart-information">
                <CartItems cartItems={cartItems} />
                <CartTotal />
            </div>
            <CartAds />
        </>
    )
}

export default CartInformation;