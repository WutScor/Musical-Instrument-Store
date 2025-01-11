import { Link } from 'react-router-dom';
import { FaAngleRight } from "react-icons/fa6";

const CartIntro = () => {
    return (
        <div className="position-relative w-100 border overflow-hidden intro-frame">
            <img src="https://s3-alpha-sig.figma.com/img/1461/f3d6/ff74c027a1888544144abe4be6e02cbf?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=CJzUmGSk4dQW4F5hg87itVdbgOE1EvVy82-bPZlP2iZ6pblcWloKIhYoCgI3cKwKPusnnT19VhUzF7lsWKT4RkANJfo3lj8NubvTbFW~V3Dp92U-zB1Dpe-hfZ4hSxYE5j2a-sKAiWR69KvvNpUKBd4EgNqj4ewJhYQSzNjZgZU0i4DXuoF4YOkd4C1CGsf5ZjidDGST4vmnX6cHM63Wf-fsyHaEkM-RfFVHI12G8W3X6-oAeNX~-vnO3S6eG0yk0Y9fRD6YAHEalV-coZYAr4eNoTvkL0rMjEUYBpNMJiYljE4zeb~Mm36GtUM7SuxDdmj2524-BHBv20usOe-9Yg__" alt="bg" className="intro-img"></img>
            <div className="intro-text d-flex flex-column justify-content-center align-items-center">
                {/* Logo */}
                <h1 className="intro-header">Cart</h1>
                <div className="d-flex justify-content-center align-items-center">
                    <Link to="/" className='link-text'>Home</Link>
                    <FaAngleRight className="mx-1 link-text"/>
                    <Link to="/cart" className='link-text'>Cart</Link>
                </div>
            </div>
        </div>
    )
}

export default CartIntro;