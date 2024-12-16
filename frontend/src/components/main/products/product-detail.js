import React, { useState } from "react";
import ProductCounter from "./product-counter";
import { FaFacebook, FaLinkedin, FaPinterest } from "react-icons/fa";

const ShowProductDetail = () => {
  const [showNotification, setShowNotification] = useState(false);

  const handleAddToCart = () => {
    setShowNotification(true); // Hiển thị thông báo khi click "Add to Cart"
    setTimeout(() => {
      setShowNotification(false); // Ẩn thông báo sau 2 giây
    }, 2000);
  };
  return (
    <>
      {/* Notification Bar */}
      {showNotification && (
        <div className="notification-bar">Product has been added to cart!</div>
      )}
      <div className="d-flex mt-4 product-detail-container">
        {/* Images */}
        <div className="image-field">
          {/* Small image */}
          <div className="d-flex flex-column small-gallery">
            <img
              src="https://guitarsaoviet.com/wp-content/uploads/2020/03/z4103330088588_d4088c84e86a6a37ed18e825a7e2bc96.jpg"
              alt="img"
              className="small-img"
            ></img>
            <img
              src="https://guitarsaoviet.com/wp-content/uploads/2020/03/z4103330088588_d4088c84e86a6a37ed18e825a7e2bc96.jpg"
              alt="img"
              className="small-img"
            ></img>
            <img
              src="https://guitarsaoviet.com/wp-content/uploads/2020/03/z4103330088588_d4088c84e86a6a37ed18e825a7e2bc96.jpg"
              alt="img"
              className="small-img"
            ></img>
            <img
              src="https://guitarsaoviet.com/wp-content/uploads/2020/03/z4103330088588_d4088c84e86a6a37ed18e825a7e2bc96.jpg"
              alt="img"
              className="small-img"
            ></img>
          </div>
          {/* Big image */}
          <div class>
            <img
              src="https://guitarsaoviet.com/wp-content/uploads/2020/03/z4103330088588_d4088c84e86a6a37ed18e825a7e2bc96.jpg"
              alt="img"
              className="big-img"
            ></img>
          </div>
        </div>

        {/* Details */}
        <div className="product-detail">
          <h3>Instrument Name</h3>
          <h5>250,000.00</h5>
          {/* Rating */}
          <div className="d-flex align-items-center my-3">
            <div className="rating-container">
              <span className="star">★</span>
              <span className="star">★</span>
              <span className="star">★</span>
              <span className="star">★</span>
              <span className="star">★</span>
            </div>
            <div>
              <p>5 Customer Review</p>
            </div>
          </div>
          {/* Mini Description */}
          <div className="mini-description">
            <p className="flex flex-wrap">
              Mini Description here - Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Nulla quam velit, vulputate eu pharetra nec,
              mattis ac neque. Duis vulputate commodo lectus, ac blandit elit
              tincidunt id.
            </p>
          </div>
          {/* Color */}
          <div className="my-4">
            <p className="color-title">Color</p>
            <div className="d-flex gap-4">
              <div className="color-box bg-primary"></div>
              <div className="color-box bg-success"></div>
              <div className="color-box bg-danger"></div>
            </div>
          </div>
          <div className="d-flex button-container">
            <ProductCounter />
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              Add To Cart
            </button>
            <button className="d-flex align-items-center gap-2 compare-btn">
              <p>+</p>
              <p>Compare</p>
            </button>
          </div>
          {/* More Information */}
          <div className="d-flex gap-4 mt-5">
            <div>
              <div className="bonus-title">
                <p>SKU</p>
                <div className="d-flex gap-2">
                  <p>:</p>
                  <p>SS001</p>
                </div>
              </div>
              <div className="bonus-title">
                <p>Category</p>
                <div className="d-flex gap-2">
                  <p>:</p>
                  <p>Guitar</p>
                </div>
              </div>
              <div className="bonus-title">
                <p>Tags</p>
                <div className="d-flex gap-2">
                  <p>:</p>
                  <p>Guitar, Electric, Shop</p>
                </div>
              </div>
              <div className="bonus-title">
                <p>Share</p>
                <div className="d-flex gap-2">
                  <p>:</p>
                  <div className="d-flex gap-4 justify-content-center align-items-center">
                    <FaFacebook />
                    <FaLinkedin />
                    <FaPinterest />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowProductDetail;
