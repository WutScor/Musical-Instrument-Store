import CheckoutIntro from "../../components/Client/checkout/checkout-intro";
import BillingDetails from "../../components/Client/checkout/billing-details";
import CheckoutProducts from "../../components/Client/checkout/checkout-products";
import CartAds from "../../components/Client/cart/cart-ads";

const Checkout = () => {
    return (
        <>
            <CheckoutIntro />
            <div className="d-flex mb-5">
                <div className="w-50" style={{ padding: '50px 100px' }}>
                    <BillingDetails />
                </div>
                <div className="w-50" style={{ padding: '80px 100px' }}>
                    <CheckoutProducts />
                </div>
            </div>
            <CartAds />
        </>
    )
}

export default Checkout;