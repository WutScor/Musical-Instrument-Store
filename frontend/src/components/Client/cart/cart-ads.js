import { AiOutlineTrophy } from "react-icons/ai";
import { AiOutlineSafety } from "react-icons/ai";
import { AiOutlineTruck } from "react-icons/ai";
import { AiOutlineCustomerService } from "react-icons/ai";

const CartAds = () => {
  return (
    <>
      <div className="d-flex justify-content-between ads-frame">
        <div className="d-flex justify-content-center align-items-center ads-part">
          <AiOutlineTrophy className="ads-icon" />
          <div>
            <h5 className="fw-semibold">High Quality</h5>
            <p className="ads-text">crafted from top materials</p>
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center ads-part">
          <AiOutlineSafety className="ads-icon"/>
          <div>
            <h5 className="fw-semibold">Warranty Protection</h5>
            <p className="ads-text">Over 2 years</p>
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center ads-part">
          <AiOutlineTruck className="ads-icon"/>
          <div>
            <h5 className="fw-semibold">Free Shipping</h5>
            <p className="ads-text">Order over 150$</p>
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center ads-part">
          <AiOutlineCustomerService className="ads-icon"/>
          <div>
            <h5 className="fw-semibold">24/7 Support</h5>
            <p className="ads-text">Dedicated support</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartAds;
