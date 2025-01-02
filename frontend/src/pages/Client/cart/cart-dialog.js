import React, { useContext } from "react";
import { Button, Dialog, Slide } from "@mui/material";
import { CartContext } from "../../../context/cartContext";
import { BsBagX } from "react-icons/bs";
import CDialogComponent from "../../../components/Client/cart/dialog/cdialog-component";
import { Link } from "react-router-dom";


const CartDialog = () => {

    const context = useContext(CartContext);

    return(
        <>
            <Dialog open={context.isOpenCart} className="cart-dialog" onClose={() => context.setIsOpenCart(false)}>
                <div className="pad-25">
                    <div className="d-flex justify-content-between align-items-center">
                        <h3>Shopping Cart</h3>
                        <Button onClick={() => context.setIsOpenCart(false)}><BsBagX/></Button>
                    </div>
                    <hr/>
                    <div className="d-flex flex-column mt-5">
                        <CDialogComponent/>
                    </div>
                </div>
                <hr className="mt-5 mb-0" />
                <div className="pad-25">
                    <div className="d-flex justify-content-around align-items-center btn-grp">
                        <Link to={'/cart'}><Button onClick={() => context.setIsOpenCart(false)}>Cart</Button></Link>
                        <Link to={'/checkout'}><Button>Checkout</Button></Link>
                        <Link><Button>Comparison</Button></Link>
                    </div>
                </div>
            </Dialog>
        </>
    )
}

export default CartDialog;