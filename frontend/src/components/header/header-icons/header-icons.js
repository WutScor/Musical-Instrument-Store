import { Button } from "@mui/material";
import { AiOutlineUser, AiOutlineSearch, AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";

const HeaderIcons = () => {
    return(
        <>
            <div className="header-icons ms-auto d-flex justify-content-between">
                <Link to={'/user'}><AiOutlineUser/></Link>
                <Link to={'/shop'}><AiOutlineSearch/></Link>
                <Link to={'/favorite'}><AiOutlineHeart/></Link>
                <Button><AiOutlineShoppingCart/></Button>
            </div>
        </>
    )
}

export default HeaderIcons;