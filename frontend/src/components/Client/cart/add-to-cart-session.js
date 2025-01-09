
export const addToSessionCart = (product, quantity) => {
    let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    const productIndex = cart.findIndex((item) => item.id === product.id);
    if (productIndex === -1) {
        cart.push({ ...product, quantity: quantity });
    } else {
        cart[productIndex].quantity += quantity;
    }
    sessionStorage.setItem('cart', JSON.stringify(cart));
    // console.log("Session Cart: ", cart);
}