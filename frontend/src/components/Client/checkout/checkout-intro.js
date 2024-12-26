import { Link } from 'react-router-dom';
import { FaAngleRight } from "react-icons/fa6";

const CheckoutIntro = () => {
    return (
        <>
            <div class="position-relative w-100 border overflow-hidden intro-frame">
                <img src="https://static.vecteezy.com/system/resources/thumbnails/028/246/009/small_2x/colored-minimalis-living-room-design-simple-fictional-sophisticated-product-design-furniture-design-white-background-generative-ai-photo.jpg" alt="bg" className="intro-img"></img>
                <div className="intro-text d-flex flex-column justify-content-center align-items-center">
                    {/* Logo */}
                    <h1 className="intro-header">Checkout</h1>
                    <div className="d-flex justify-content-center align-items-center">
                        <Link to="/" className='link-text'>Home</Link>
                        <FaAngleRight className="mx-1 link-text" />
                        <Link to="/cart" className='link-text'>Checkout</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CheckoutIntro;