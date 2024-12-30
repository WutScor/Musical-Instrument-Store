import CheckoutIntro from "../../components/Client/checkout/checkout-intro";
import BillingDetails from "../../components/Client/checkout/billing-details";
import CheckoutProducts from "../../components/Client/checkout/checkout-products";
import CartAds from "../../components/Client/cart/cart-ads";
import CheckoutPayment from "../../components/Client/checkout/checkout-pay";
import { useRef } from "react";
import { useState } from "react";

const Checkout = () => {
    const user = {
        username: 'John Doe',
        wallet: 100000
    };
    const cartProducts = [
        {
            id: 1,
            name: 'Product Name 1',
            price: 250000,
            quantity: 1
        },
        {
            id: 2,
            name: 'Product Name 2',
            price: 500000,
            quantity: 2
        }
    ];

    const total = cartProducts.reduce((acc, product) => acc + product.price * product.quantity, 0);

    const billingDetailsRef = useRef();
    const [isWaiting, setIsWaiting] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [message, setMessage] = useState("");

    const handlePlaceOrder = () => {
        setIsWaiting(true);
        setPaymentStatus(null);

        setTimeout(() => {
            const billingDetails = billingDetailsRef.current.getBillingDetails();
            console.log('Billing Details:', billingDetails);
            console.log('Total:', total);

            if (user.wallet >= total) {
                setPaymentStatus('success');
                setTimeout(() => {
                    window.location.reload(); // Reload trang
                }, 4000);
            }
            else {
                setPaymentStatus('failed');
                setMessage('Insufficient Funds! Please top up your wallet to place order');
                setTimeout(() => {
                    setMessage("");
                }, 4000);
            }
            setIsWaiting(false);
        }, 2000);
    }
    return (
        <>
            <CheckoutIntro />
            <div className="d-flex mb-5">
                <div className="w-50" style={{ padding: '50px 100px' }}>
                    <BillingDetails ref={billingDetailsRef} />
                </div>
                <div className="w-50" style={{ padding: '80px 100px' }}>
                    <CheckoutProducts products={cartProducts} total={total} />
                    <div className="mt-4">
                        <CheckoutPayment user={user} />
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                        <button onClick={handlePlaceOrder} className="checkout-btn">Place Order</button>
                    </div>
                    <div>
                        <p className="mt-4 text-center" style={{ color: "red" }}>{message}</p>
                    </div>
                </div>
            </div>
            <CartAds />


            {/* Waiting */}
            {isWaiting && (
                <div
                    className="modal fade show"
                    style={{
                        display: "block",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                    }}
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-body text-center">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="sr-only"></span>
                                </div>
                                <p className="mt-3 fs-2">Waiting...</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Payment Status */}
            {paymentStatus === "success" && (
                <div className="notification-bar">Checkout successful! Your order will be delivered within 2 weeks</div>
            )}
        </>
    )
}

export default Checkout;