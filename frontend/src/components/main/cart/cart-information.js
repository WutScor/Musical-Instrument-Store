import CartTotal from './cart-total';
import CartItems from './cart-items-information';
import CartAds from './cart-ads';
import CartIntro from './cart-intro';

const CartInformation = () => {
    return (
        <>
            <CartIntro />
            <div className="cart-information">
                <CartItems/>
                <CartTotal/>
            </div>
                <CartAds/>
        </>
    )
}

export default CartInformation;