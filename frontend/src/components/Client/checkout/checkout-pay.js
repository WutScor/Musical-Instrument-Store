import { formattedPrice } from "../cart/format-price";

const CheckoutPayment = ({ user }) => {
    // console.log('Payment User:', user);
    return (
        <>
            <div className="d-flex flex-column gap-2">
                <h4 className="text-center">Account Payment</h4>
                <div className="d-flex flex-column gap-4">
                    <div className="d-flex justify-content-between w-50">
                        <p style={{ width: '30%' }}>User</p>
                        <p>:</p>
                        <p style={{ width: '30%' }}>{user.username}</p>
                    </div>
                    <div className="d-flex justify-content-between w-50">
                        <p style={{ width: '30%' }}>Wallet</p>
                        <p>:</p>
                        <p style={{ width: '30%' }}>{user.payment_account ? formattedPrice(user.payment_account.balance) : 'N/A'}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CheckoutPayment;