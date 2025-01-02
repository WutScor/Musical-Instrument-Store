import { RiDeleteBin6Line } from "react-icons/ri";

const CartItems = () => {
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
            <tr className="items-row">
              <th className="col-4">
                <div className="d-flex justify-content-center align-items-center">
                  <img
                    src="https://product.hstatic.net/200000423875/product/strat_debut_dkr-2048x2048_fd2ba961cb5c4761b854ef355d4714e1_master.png"
                    alt=""
                    className="cart-img"
                  ></img>
                  <p className="flex-wrap fw-normal">
                    SQUIER DEBUT STRAT LAUREL DAKOTA RED
                  </p>
                </div>
              </th>
              <th className="col-3">
                <p class="fw-normal">250,000.00</p>
              </th>
              <th className="col-1">
                <p class="fw-normal quality">1</p>
              </th>
              <th className="col-3">
                <p class="fw-normal">250,000.00</p>
              </th>
              <th className="col-2"><RiDeleteBin6Line className="fs-5 delete-item"></RiDeleteBin6Line></th>
            </tr>
          </tbody>
        </table>
      </div>

      {/* -------------------------------- */}
    </>
  );
};

export default CartItems;
