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
                    <Button onClick={() => context.setIsOpenCart(true)} className="cart-button">
                        <AiOutlineShoppingCart size={24} />
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger cart-badge">
                            {context.cartItemQtty}
                        </span>
                    </Button>
                </div>
            </div>

        </>
    )
}

export default CartIcon;