import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

// Cart Total
const CartTotal = () => {
    return (
        <>
            <div className="cart-total">
                <h2 className="fw-bolder mb-5">Cart Totals</h2>
                {/* Checkout Information */}
                <div>
                    <div className="cash-info">
                        <h6>Subtotal</h6>
                        <p className="subtotal-text">250,000.00</p>
                    </div>
                    <div className="cash-info">
                        <h6>Total</h6>
                        <p className="total-text">250,000.00</p>
                    </div>
                </div>
                <Link><Button className="checkout-btn">Check Out</Button></Link>
            </div>
        </>
    )
}

export default CartTotal;