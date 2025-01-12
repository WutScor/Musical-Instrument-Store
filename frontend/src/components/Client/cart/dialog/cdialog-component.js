import { Button } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../../../../context/cartContext";
import { AuthContext } from "../../../../context/authContext";
import NoticeDialog from "../notice-dialog";

const CDialogComponent = ({ products, cartId }) => {
    const context = useContext(CartContext);
    const authContext = useContext(AuthContext);
    const newProducts = [...products];
    const [count, setCount] = useState(newProducts.length > 0 ? newProducts[0].quantity : 1);
    const [showForm, setShowForm] = useState({ open: false, message: "" });

    const updateProductQuantity = async (id, quantity) => {
        const update = await fetch(`/carts/${cartId}/items`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${context.token}`
            },
            body: JSON.stringify([
                {
                    "itemId": id,
                    "quantity": quantity
                }
            ])
        })
        if (update.ok) {
            console.log('Update success');
        }
        else {
            console.error('Error updating product quantity:', update);
        }
        return update;
    }


    const handleChangeQuantity = async (e) => {
        const value = parseInt(e.target.value, 10);
        setCount(isNaN(value) ? 1 : Math.max(1, value));
        const response = await updateProductQuantity(newProducts[0].id, value);
        if (response.ok) {
            newProducts[0].quantity = value;
        }
        else {
            console.error('Error updating product quantity:', response);
        }
    }

    const handleIncressQuantity = async () => {
        const respone = await updateProductQuantity(newProducts[0].id, newProducts[0].quantity + 1);
        if (respone.ok) {
            setCount(count + 1);
            newProducts[0].quantity += 1;
        }
    }

    const handleDecressQuantity = async () => {
        if (count > 1) {
            setCount(count - 1);
            newProducts[0].quantity -= 1;
            const response = await updateProductQuantity(newProducts[0].id, newProducts[0].quantity);
            console.log(response);
        }
        else {
            setShowForm({ open: true, message: "Do you want to remove this item?" });
        }
    }

    const closeDialog = () => {
        setShowForm({ open: false, message: "" });
    }

    const handleRemoveItem = async () => {
        if (authContext.user && authContext.user.id) {
            const remove = await fetch(`/carts/${cartId}/items/${newProducts[0].id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${context.token}`
                }
            });
            if (remove.ok) {
                console.log('Remove success');
                window.location.reload();
            }
        }
        else {
            const storedCart = JSON.parse(sessionStorage.getItem("cart")) || [];
            const newCart = storedCart.filter((item) => item.id !== newProducts[0].id);
            sessionStorage.setItem("cart", JSON.stringify(newCart));
            window.location.reload();
        }
    }

    return (
        <>
            {products.length > 0 ? (
                <div>
                    {products.map((product) => (
                        <div key={product.id} className="cdialog-component d-flex align-items-center justify py-2">
                            <div style={{ width: '30%' }}>
                                <img
                                    src={product.image}
                                    alt="img"
                                    className="cdialog-img"
                                />
                            </div>
                            <div className="d-flex flex-column align-items-center" style={{ width: '70%' }}>
                                <p style={{ fontSize: '0.9rem' }}>{product.name}</p>
                                <div className="counter d-flex align-items-center justify-content-between mt-1">
                                    <Button className="minus" onClick={handleDecressQuantity}>-</Button>
                                    <input type="text" value={count} onChange={handleChangeQuantity} />
                                    <Button className="plus" onClick={handleIncressQuantity}>+</Button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <NoticeDialog open={showForm.open} message={showForm.message} onClose={closeDialog} onLink={handleRemoveItem} button1="No" button2="Yes" />
                </div>
            ) : (
                <div>
                    <p>No items in cart</p>
                </div>
            )}
        </>
    )
}

export default CDialogComponent;
