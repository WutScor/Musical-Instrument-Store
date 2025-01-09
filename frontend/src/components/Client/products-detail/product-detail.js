import React, { useState, useEffect, useContext } from "react";
import ProductCounter from "./product-quantity-counter";
import { FaFacebook, FaLinkedin, FaPinterest } from "react-icons/fa";
import { AuthContext } from "../../../context/authContext";
import { addToSessionCart } from "../cart/add-to-cart-session";

const ShowProductDetail = ({ productDetail }) => {
  // Hiển thị nội dung sản phẩm (hình ảnh sản phẩm, chi tiết, đánh giá, thêm vào giỏ hàng theo số lượng, so sánh,...)
  // console.log("Product Detail: ", productDetail);
  const [showNotification, setShowNotification] = useState({ show: false, message: '', color: '' });
  const [count, setCount] = useState(1);
  //const [categoryName, setCategory] = useState('Unknown Category');
  const { id, name, image, price, release_year, category, quantity } = productDetail;
  const context = useContext(AuthContext);

  const categoryName = category ? category.name : 'Unknown Category';

  // console.log("Context: ", context);
  // console.log("Context User: ", context.user);
  // console.log("user id: ", context.user.id);
  const increment = () => setCount(count + 1);
  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  useEffect(() => {
    setCount(1);
  }, [productDetail]);

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

  const handleAddToCart = async () => {
    const token = context.token;
    if (count <= quantity) {
      if (!token) {
        addToSessionCart(productDetail, count);
        setNotice(true, "Product has been added to cart!", "green");
        setTimeout(() => {
          setNotice(false, '', '');
        }, 2000);
      }
      else {
        const cartID = context.user.id;
        console.log("Cart ID: ", cartID);
        const params = new URLSearchParams({
          page:  1,
          limit: 5
      });
        const makeCart = await fetch(`/carts?${params.toString()}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            user_id: cartID
          })
        });
        const response = await fetch(`/carts/${cartID}/items`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify([
            {
              "itemId": productDetail.id,
              "quantity": count
            }
          ])
        });

      }
    }
    else if (quantity === 0) {
      setNotice(true, "Product is out of stock!", "red");
    }
    else {
      setNotice(true, "Quantity exceeds the available quantity!", "red");
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
            <div className="d-flex align-items-center gap-4 fw-bolder" style={{ fontSize: '1.1rem', color: quantity > 50 ? "green" : quantity > 20 ? "goldenrod" : quantity > 0 ? "orange" : "red" }}>
              <p>In stock: </p>
              <p>{quantity}</p>
            </div>
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
