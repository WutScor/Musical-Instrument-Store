import { Button } from "@mui/material";
import { useContext } from "react";
import { CartContext } from "../../../../context/cartContext";

const CDialogComponent = () => {

    const context = useContext(CartContext);

    return(
        <>
            <div className="cdialog-component d-flex align-items-center justify">
                <img
                    src="https://product.hstatic.net/200000423875/product/strat_debut_dkr-2048x2048_fd2ba961cb5c4761b854ef355d4714e1_master.png"
                    alt=""
                    className="cart-img"
                />
                <div className="d-flex flex-column align-items-center w-100">
                    <h5>Name</h5>
                    <div className="counter d-flex align-items-center justify-content-between">
                        <Button className="minus" onClick={() => context.minusCartItemQtty()}>-</Button>
                        <input type="text" value={context.cartItemQtty} />
                        <Button className="plus" onClick={() => context.plusCartItemQtty()}>+</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CDialogComponent;