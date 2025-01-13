
export const addToSessionCart = (product, quantity, max) => {
    let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    const productIndex = cart.findIndex((item) => item.id === product.id);
    if (productIndex === -1) {
        cart.push({ ...product, quantity: quantity, available: max });
        sessionStorage.setItem('cart', JSON.stringify(cart));
        return {ok: true}
    } else {
        if(quantity > max) {
            sessionStorage.setItem('cart', JSON.stringify(cart));
            return {ok: false}
        }
        else {
            cart[productIndex].quantity = quantity;
            sessionStorage.setItem('cart', JSON.stringify(cart));
            return {ok: true}
        }
    }
}