import { RiDeleteBin6Line } from "react-icons/ri";
import { useState, useEffect } from "react";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";

const CartItems = ({cartItems}) => {
  // const [cartItems, setCartItems] = useState([]);
  const [deleteConfirm, setDeleteConfirm] = useState({open: false, cartItemId: null});

  // useEffect(() => {
  //   const storedCart = JSON.parse(sessionStorage.getItem("cart")) || [];
  //   setCartItems(storedCart);
  // }, []);

  const calculateSubtotal = (item) => item.quantity * item.price;

  const confirmDelete = (id) => {
    setDeleteConfirm({open: true, cartItemId: id});
  };

  const handleCloseDialog = () => {
    setDeleteConfirm({open: false, cartItemId: null});
  }

  const handleDeleteItem = (id) => {
    const updateCart = cartItems.filter((item) => item.id !== id);
    // setCartItems(updateCart);
    sessionStorage.setItem("cart", JSON.stringify(updateCart));
    handleCloseDialog();
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
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-img w-50"
                  />
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
