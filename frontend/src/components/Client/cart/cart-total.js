import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

// Cart Total
const CartTotal = ({cartItems}) => {
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const formattedTotal = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(total);

    return (
        <>
            <div className="cart-total">
                <h2 className="fw-bolder mb-5">Cart Totals</h2>
                {/* Checkout Information */}
                <div className="w-100 px-3">
                    <div className="cash-info">
                        <h6>Subtotal</h6>
                        <p className="subtotal-text">{formattedTotal}</p>
                    </div>
                    <div className="cash-info">
                        <h6>Total</h6>
                        <p className="total-text">{formattedTotal}</p>
                    </div>
                </div>
                <Link to={'/checkout'}><Button className="checkout-btn">Check Out</Button></Link>
            </div>
        </>
    )
}

export default CartTotal;