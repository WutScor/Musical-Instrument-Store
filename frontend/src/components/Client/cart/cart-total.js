import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/authContext';
import { useContext, useState } from 'react';
import NoticeDialog from './notice-dialog';

// Cart Total
const CartTotal = ({ cartItems }) => {
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const [notice, setNotice] = useState({ open: false, message: "" });

    const navigate = useNavigate();

    const formattedTotal = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(total);

    const context = useContext(AuthContext);

    const checkUserToCheckout = () => {
        const token = context.token;
        if (!token) {
            setNotice({ open: true, message: "You need to login to checkout!" });
        }
        else {
            navigate('/checkout');
        }
    }

    const closeNotice = () => {
        setNotice({ open: false, message: "" });
    }

    const onLink = () => {
        navigate('/auth/signin');
    }

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
                <Button className="checkout-btn" onClick={checkUserToCheckout}>Check Out</Button>
            </div>
            <NoticeDialog open={notice.open} message={notice.message} onClose={closeNotice} onLink={onLink} button1={"Cancel"} button2={"Login"} />
        </>
    )
}

export default CartTotal;