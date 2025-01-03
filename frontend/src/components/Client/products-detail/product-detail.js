import React, { useState } from "react";
import ProductCounter from "./product-quantity-counter";
import { FaFacebook, FaLinkedin, FaPinterest } from "react-icons/fa";

const ShowProductDetail = ({ productDetail }) => {
  // Hiển thị nội dung sản phẩm (hình ảnh sản phẩm, chi tiết, đánh giá, thêm vào giỏ hàng theo số lượng, so sánh,...)
  const [showNotification, setShowNotification] = useState({ show: false, message: '', color: '' });
  const [count, setCount] = useState(1);
  //const [categoryName, setCategory] = useState('Unknown Category');
  const { id, name, image, price, release_year, category, quantity } = productDetail;

  const categoryName = category ? category.name : 'Unknown Category';

  const increment = () => setCount(count + 1);
  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setCount(isNaN(value) ? 1 : Math.max(1, value));
  };

  const setNotice = (isShow, message, color) => {
    setShowNotification({ show: isShow, message: message, color: color });
    setTimeout(() => {
      setShowNotification({ show: false, message: '', color: '' });
    }, 2000);
  };

  const handleAddToCart = () => {
    if (count <= quantity) {
      setNotice(true, "Product has been added to cart!", "green"); // Hiển thị thông báo khi click "Add to Cart"
      setTimeout(() => {
        setNotice(false, '', ''); // Ẩn thông báo sau 2 giây
      }, 2000);
    }
    else if (quantity === 0) {
      setNotice(true, "Product is out of stock!", "red"); // Hiển thị thông báo khi click "Add to Cart"
    }
    else {
      setNotice(true, "Quantity exceeds the available quantity!", "red"); // Hiển thị thông báo khi click "Add to Cart"
    }
  };
  return (
    <>
      {/* Notification Bar */}
      {showNotification.show && (
        <div className="notification-bar" style={{ background: showNotification.color }}>{showNotification.message}</div>
      )}
      <div className="d-flex mt-4 product-detail-container">
        {/* Images */}
        <div className="image-field">
          {/* Small image
          <div className="d-flex flex-column small-gallery">
            <img
              src={ image }
              alt={ name }
              className="small-img"
            ></img>
            <img
              src={ image }
              alt={ name }
              className="small-img"
            ></img>
            <img
              src={ image }
              alt={ name }
              className="small-img"
            ></img>
            <img
              src={ image }
              alt={ name }
              className="small-img"
            ></img>
          </div> */}
          {/* Big image */}
          <div>
            <img
              src={image}
              alt={name}
              className="big-img"
            ></img>
          </div>
        </div>

        {/* Details */}
        <div className="product-detail">
          <h3>{name}</h3>
          <h5>${price}</h5>
          {/* Rating */}
          <div className="d-flex ms-4 align-items-center my-3">
            {/* <div className="rating-container">
              <span className="star">★</span>
              <span className="star">★</span>
              <span className="star">★</span>
              <span className="star">★</span>
              <span className="star">★</span>
            </div>
            <div>
              <p>5 Customer Review</p>
            </div> */}
            <div className="d-flex align-items-center gap-4 fw-bolder" style={{ fontSize: '1.1rem', color: quantity > 50 ? "green" : quantity > 20 ? "goldenrod" : quantity > 0 ? "orange" : "red" }}>
              <p>In stock: </p>
              <p>{quantity}</p>
            </div>
            {/* <p>Available since {release_year}</p> */}
          </div>
          {/* Mini Description */}
          <div className="mini-description">
            <p className="flex flex-wrap">
              {productDetail.description}
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
            {/* Điều chỉnh số lượng sản phẩm muốn thêm vào Cart */}
            <div className="product-counter d-flex align-items-center gap-4">
              <button className="counter-btn" onClick={decrement}>-</button>
              <input
                type="number"
                className="counter-num"
                value={count}
                onChange={handleChange}
              />
              <button className="counter-btn" onClick={increment}>+</button>
            </div>
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              Add To Cart
            </button>
            {/* <button className="d-flex align-items-center gap-2 compare-btn">
              <p>+</p>
              <p>Compare</p>
            </button> */}
          </div>
          {/* More Information */}
          <div className="mt-5">
            <div className="d-flex gap-2 more-info-container">
              <div className="bonus-title">
                <p>SKU</p>
                <p>:</p>
              </div>
              <p className="more-info-text">{id}</p>
            </div>
            <div className="d-flex gap-2 more-info-container">
              <div className="bonus-title">
                <p>Category</p>
                <p>:</p>
              </div>
              <p>{categoryName}</p>
            </div>
            <div className="d-flex gap-2 more-info-container">
              <div className="bonus-title">
                <p>Release</p>
                <p>:</p>
              </div>
              <p>{release_year}</p>
            </div>
            <div className="d-flex gap-2 share-field">
              <div className="bonus-title more-info-container mb-0">
                <p>Share</p>
                <p>:</p>
              </div>
              <div className="d-flex gap-3">
                <FaFacebook className="icon-share" />
                <FaLinkedin className="icon-share" />
                <FaPinterest className="icon-share" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowProductDetail;
