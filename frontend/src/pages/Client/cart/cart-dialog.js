import React, { useContext } from "react";
import { Button, Dialog, Slide } from "@mui/material";
import { MyContext } from "../../../App";
import { BsBagX } from "react-icons/bs";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
    ) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const CartDialog = () => {

    const context = useContext(MyContext);

    return(
        <>
            <Dialog open={true} className="cart-dialog" onClose={() => context.setIsOpenCart(false)}>
                <div className="d-flex justify-content-between align-items-center">
                    <h3>Shopping Cart</h3>
                    <Button onClick={() => context.setIsOpenCart(false)}><BsBagX/></Button>
                </div>
                <hr/>
            </Dialog>
        </>
    )
}

export default CartDialog;