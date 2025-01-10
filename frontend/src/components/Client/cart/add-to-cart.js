export const addToCart = async (product, quantity, cartId, token) => {
    try {
        // Đảm bảo Cart đã được tạo trước khi thêm sản phẩm
        const params = new URLSearchParams({
            page: 1,
            limit: 5
        });
        const makeCart = await fetch(`/carts?${params.toString()}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                user_id: cartId
            })
        });
        // console.log(makeCart.json());
        const cartData = await makeCart.json();

        // Sau khi giỏ hàng được tạo (nếu chưa có), thêm sản phẩm vào giỏ hàng
        if(makeCart.ok) {
            const id = cartData.items.cart_id;
            const response = await fetch(`/carts/${id}/items`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify([
                    {
                        "itemId": product.id,
                        "quantity": quantity
                    }
                ])
            });
            return response;
        }
        else {
            console.error('Error creating cart:', makeCart);
        }
    }
    catch (error) {
        console.error('Error adding to cart:', error);
    }
}