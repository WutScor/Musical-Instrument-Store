import { RiDeleteBin6Line } from "react-icons/ri";
import { useState, useContext } from "react";
import { AuthContext } from "../../../context/authContext";
import { CartContext } from "../../../context/cartContext";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";

const CartItems = ({ cartItems, setCartItems, showNotice, cartID, totalItems }) => {
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, cartItemId: null });
  const context = useContext(AuthContext);
  const cartContext = useContext(CartContext);

  const calculateSubtotal = (item) => item.quantity * item.price;

  const confirmDelete = (id) => {
    setDeleteConfirm({ open: true, cartItemId: id });
  };

  const handleCloseDialog = () => {
    setDeleteConfirm({ open: false, cartItemId: null });
  }

  const handleDeleteItem = async (id) => {
    if (context.user && context.user.id) {
      try {
        const deleteItem = await fetch(`/carts/${cartID}/items/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${context.token}`
          }
        });
        if (deleteItem.ok) {
          const updateCart = cartItems.filter((item) => item.id !== id);
          setCartItems(updateCart);
          cartContext.updateCartItemQtty(totalItems);
          showNotice(true, "Item has been removed from cart!", "green");
          handleCloseDialog();
          window.location.reload();
        }
        else {
          console.error('Error deleting item:', deleteItem);
          showNotice(true, "Error deleting item!", "red");
        }
      }
      catch (error) {
        console.error('Error deleting item:', error);
      }
    }
    else {
      const updateCart = cartItems.filter((item) => item.id !== id);
      sessionStorage.setItem("cart", JSON.stringify(updateCart));
      setCartItems(updateCart);
      cartContext.updateCartItemQtty(totalItems - 1);
      window.location.reload();
      showNotice(true, "Item has been removed!", "green");
      handleCloseDialog();
    }
  };

  return (
    <>
      <div className="cart-items">
        <table>
          <thead className="items-head">
            <tr>
              <th className="col-4 fs-6 fw-normal">Product</th>
              <th className="col-3 fs-6 fw-normal">Price</th>
              <th className="col-1 fs-6 fw-normal">Quantity</th>
              <th className="col-3 fs-6 fw-normal">Subotal</th>
              <th className="col-2 fs-6 fw-normal"></th>
            </tr>
          </thead>
          <tbody className="items-body">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <tr key={item.id} className="items-row">
                  <th className="col-4">
                    <div className="d-flex justify-content-between align-items-center gap-4">
                      <div className="w-50">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="cart-img"
                        />
                      </div>
                      <p className="flex-wrap fw-normal w-50">
                        {item.name}
                      </p>
                    </div>
                  </th>
                  <th className="col-3">
                    <p className="fw-normal">$ {item.price}</p>
                  </th>
                  <th className="col-1">
                    <p className="fw-normal quality">{item.quantity}</p>
                  </th>
                  <th className="col-3">
                    <p className="fw-normal">$ {calculateSubtotal(item)}</p>
                  </th>
                  <th className="col-2"><RiDeleteBin6Line className="fs-5 delete-item" onClick={() => confirmDelete(item.id)}></RiDeleteBin6Line></th>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  <p className="mt-5 fs-3">No items in cart</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Dialog
        open={deleteConfirm.open}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this item? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleDeleteItem(deleteConfirm.cartItemId);
            }}
            color="error"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* -------------------------------- */}
    </>
  );
};

export default CartItems;
