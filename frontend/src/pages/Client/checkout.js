import CheckoutIntro from "../../components/Client/checkout/checkout-intro";
// import BillingDetails from "../../components/Client/checkout/billing-details";
import CheckoutProducts from "../../components/Client/checkout/checkout-products";
import CartAds from "../../components/Client/cart/cart-ads";
import CheckoutPayment from "../../components/Client/checkout/checkout-pay";
// import { useRef } from "react";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/authContext";

const Checkout = () => {
    const [cartProducts, setCartProducts] = useState([]);
    const [userDetail, setUserDetail] = useState({});
    const [cartId, setCartId] = useState(null);
    const [page, setPage] = useState(1);
    const context = useContext(AuthContext);

    // Tạo payment account
    const createPaymentAccount = async () => {
        if (context.user && context.user.id) {
            try {
                // Tạo payment account
                const response = await fetch(`/users/payment_account`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${context.token}`,
                    },
                    body: JSON.stringify({
                        "userId": context.user.id,
                    }),
                });
                if (!response.ok) {
                    throw new Error(`Error fetching user: ${response.status} - ${response.statusText}`);
                }
            }
            catch (error) {
                console.error('Error creating payment account:', error
                );
            }
        }
    }

    const getUser = async () => {
        if (context.user && context.user.id) {
            try {
                const params = new URLSearchParams({
                    page: page || 1,
                    limit: 100,
                    search: "",
                });
                // Lấy thông tin người dùng
                const getDetail = await fetch(`/users?${params.toString()}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${context.token}`,
                    },
                });
                if (!getDetail.ok) {
                    throw new Error(`Error fetching user: ${getDetail.status} - ${getDetail.statusText}`);
                }
                const userData = await getDetail.json();
                // console.log('User Data:', userData);
                const user = userData.items.find(user => user.id === context.user.id);
                if (!user.payment_account || user.payment_account.balance === null) {
                    await createPaymentAccount();
                }
                setUserDetail(user);
                // console.log('Available User:', userDetail);
            }
            catch (error) {
                console.error('Error fetching user:', error);
            }
        }
    }

    const fetchCartProducts = async () => {
        if (context.user && context.user.id) {
            try {
                const params = new URLSearchParams({
                    page: page || 1,
                    limit: 5,
                });
                const response = await fetch(`/carts?${params.toString()}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${context.token}`,
                    },
                    body: JSON.stringify({
                        "user_id": context.user.id,
                    }),
                });

                if (!response.ok) {
                    throw new Error(`Error fetching cart products: ${response.status} - ${response.statusText}`);
                }

                const data = await response.json();
                // console.log('Cart Products:', data);
                setCartProducts(data.items.items);
                setCartId(data.items.cart_id);
            }
            catch (error) {
                console.error('Error fetching cart products:', error);
            }
        }
    }

    useEffect(() => {
        if (context.user && context.user.id) {
            getUser();
            fetchCartProducts();
        }
    }, [context.user]);
    const total = cartProducts.reduce((acc, product) => acc + product.musical_instrument.price * product.quantity, 0);

    // const billingDetailsRef = useRef();
    const [isWaiting, setIsWaiting] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState({ show: false, message: "", color: "" });
    const [message, setMessage] = useState("");

    const setStatus = (show, message, color) => {
        setPaymentStatus({ show, message, color });
        setTimeout(() => {
            setPaymentStatus({ show: false, message: "", color: "" });
        }, 3000);
    }

    const handlePlaceOrder = async () => {
        //     // const checkValidation = billingDetailsRef.current.validateForm();

        //     // if (!checkValidation) {
        //     //     return;
        //     // }

        //     setIsWaiting(true);
        //     setPaymentStatus({show: false, message: "", color: ""});

        //     setTimeout(() => {
        //         // const billingDetails = billingDetailsRef.current.getBillingDetails();
        //         // console.log('Billing Details:', billingDetails);
        //         // console.log('Total:', total);

        //         if (user.wallet >= total) {
        //             setStatus(true, "Checkout successful! Your order will be delivered within 2 weeks", "green");
        //             setTimeout(() => {
        //                 window.location.reload(); // Reload trang
        //             }, 4000);
        //         }
        //         else {
        //             setStatus(true, "Checkout failed! Your wallet balance is insufficient", "red");
        //             setMessage('Insufficient Funds! Please top up your wallet to place order');
        //             setTimeout(() => {
        //                 setMessage("");
        //             }, 3000);
        //         }
        //         setIsWaiting(false);
        //     }, 2000);

        setIsWaiting(true);
        const pay = await fetch(`/carts/${cartId}/checkout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${context.token}`,
            },
        });

        const payData = await pay.json();
        console.log('Pay Data:', payData);
        setTimeout(() => {

            if (!pay.ok) {
                setStatus(true, "Checkout failed! Your wallet balance is insufficient", "red");
                setMessage('Insufficient Funds! Please top up your wallet to place order');
                setTimeout(() => {
                    setMessage("");
                }, 3000);
            }
            else {
                setStatus(true, "Checkout successful! Your order will be delivered within 2 weeks", "green");
                setTimeout(() => {
                    window.location.reload(); // Reload trang
                }, 4000);
            }

            setIsWaiting(false);
        }, 2000);


        console.log('Pay:', pay);
    }

    return (
        <>
            <CheckoutIntro />
            <div className="d-flex mb-5 justify-content-center">
                {/* <div className="w-50" style={{ padding: '50px 100px' }}>
                    <BillingDetails ref={billingDetailsRef} />
                </div> */}
                <div className="w-50" style={{ padding: '80px 100px' }}>
                    <CheckoutProducts products={cartProducts} total={total} />
                    <div className="mt-4">
                        <CheckoutPayment user={userDetail} />
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
            {paymentStatus.show && (
                <div className="notification-bar" style={{ background: paymentStatus.color }}>{paymentStatus.message}</div>
            )}
        </>
    )
}

export default Checkout;