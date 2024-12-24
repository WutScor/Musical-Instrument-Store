import { Button } from "@mui/material";
import { AiOutlineUser, AiOutlineSearch, AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import CartIcon from "./cart-icon/cart-icon";

const HeaderIcons = () => {
    return(
        <>
            <div className="header-icons ms-auto d-flex justify-content-between">
                <Link to={'/user'}><AiOutlineUser/></Link>
                <Link to={'/shop'}><AiOutlineSearch/></Link>
                <Link to={'/favorite'}><AiOutlineHeart/></Link>
                <div className="d-flex justify-content-center align-items-center">
                    <CartIcon/>
                </div>
            </div>
        </>
    )
}

export default HeaderIcons;