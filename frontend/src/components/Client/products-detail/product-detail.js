import React, { useState } from "react";
import ProductCounter from "./product-quantity-counter";
import { FaFacebook, FaLinkedin, FaPinterest } from "react-icons/fa";
import axios from "axios";

const ShowProductDetail = ({productDetail}) => {
  // Hiển thị nội dung sản phẩm (hình ảnh sản phẩm, chi tiết, đánh giá, thêm vào giỏ hàng theo số lượng, so sánh,...)
  const [showNotification, setShowNotification] = useState(false);
  //const [categoryName, setCategory] = useState('Unknown Category');
  console.log("Product Details: ", productDetail);
  const {id, name, image, price, description, release_year, category} = productDetail;

  const categoryName = category ? category.name : 'Unknown Category';

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
              src={ image }
              alt={ name }
              className="big-img"
            ></img>
          </div>
        </div>

        {/* Details */}
        <div className="product-detail">
          <h3>{name}</h3>
          <h5>${price}</h5>
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
              { productDetail.description }
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
                  <FaFacebook className="icon-share"/>
                  <FaLinkedin className="icon-share"/>
                  <FaPinterest className="icon-share"/> 
                </div>
              </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowProductDetail;
