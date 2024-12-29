import { AiOutlineShoppingCart } from "react-icons/ai";
import { Button } from "@mui/material";
import React, { useContext } from "react";
import { CartContext } from "../../../../../context/cartContext";

const CartIcon = () => {

    const context = useContext(CartContext);

    return(
        <>
            <div className="cart-icon">
                <div className="position-relative">
                    <Button onClick={() => context.setIsOpenCart(true)}><AiOutlineShoppingCart/></Button>
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{context.cartItemQtty}</span>
                </div>
            </div>
        </>
    )
}

export default CartIcon;