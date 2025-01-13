// import { Button } from "@mui/material";
// import { AiOutlineShareAlt, AiOutlineSwap, AiOutlineHeart } from "react-icons/ai";

// const ProductItem = ({ product }) => {
//   return (
//     <div className="product-item position-relative">
//       <div className="img-wrapper position-relative">
//         {/* Đảm bảo ảnh có kích thước phù hợp */}
//         <img src={product.image} alt={product.name} className="w-100" />
//         {/* {product.discount && (
//           <span className="badge bg-primary position-absolute">-{product.discount}%</span>
//         )} */}
//       </div>

//       <div className="product-info w-100">
//         <p className="name">{product.name}</p>
//         {/* <p className="short-desc">{product.shortDesc}</p> */}
//         <div className="row d-flex align-items-center">
//           <div className="col-md-6">
//             {/* <p className="net-price">${product.netPrice}</p> */}
//           </div>

//           <div className="col-md-6">
//             {/* {product.oldPrice && <p className="old-price">${product.oldPrice}</p>} */}
//           </div>
//         </div>
//       </div>

//       <div className="bg-hover position-absolute"></div>

//       <div className="product-hover position-absolute d-flex align-items-center justify-content-center flex-column">
//         <Button>Add to cart</Button>

//         <div className="d-flex justify-content-between align-items-center w-100 px-3 mt-4">
//           <div className="item">
//             <AiOutlineShareAlt /><p>Share</p>
//           </div>
//           <div className="item">
//             <AiOutlineSwap /><p>Compare</p>
//           </div>
//           <div className="item">
//             <AiOutlineHeart /><p>Like</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductItem;


import React from 'react';
import { Button, Box, Grid } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../context/authContext';
import { CartContext } from '../../../context/cartContext';
import { addToSessionCart } from '../cart/add-to-cart-session';
import { addToCart } from '../cart/add-to-cart';

const ProductItem = ({ product }) => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const cartContext = useContext(CartContext);

  const [showNotification, setShowNotification] = useState({ show: false, message: '', color: '' });

  const handleProductClick = () => {
    const productData = {
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      description: product.description,
      additional_information: product.additional_information,
      release_year: product.release_year,
      category: product.category,
      quantity: product.quantity,
    };
    navigate(`/product/${product.id}`, { state: { product: productData } });
  }

  const setNotice = (isShow, message, color) => {
    setShowNotification({ show: isShow, message: message, color: color });
    setTimeout(() => {
      setShowNotification({ show: false, message: '', color: '' });
    }, 2000);
  };

  const handleAddToCart = async () => {
    const token = authContext.token;
    if (product.quantity >= 1) {
      if (!token) {
        const check = addToSessionCart(product, 1, product.quantity);
        const storedCart = JSON.parse(sessionStorage.getItem("cart")) || [];
        cartContext.updateCartItemQtty(storedCart.length);
        setNotice(true, "Product has been added to cart!", "green");
      }
      else {
        if (authContext.user && authContext.user.id) {
          const cartID = authContext.user.id;
          console.log("Cart ID: ", cartID);
          const response = await addToCart(product, 1, cartID, token);
          console.log("Response: ", response);
          if (response.ok) {
            // Lấy sản phẩm để cập nhật số loại sản phẩm trong giỏ hàng
            const newFetch = await fetch(`/carts/`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({
                user_id: cartID
              })
            });
            const newCart = await newFetch.json();
            cartContext.updateCartItemQtty(newCart.data.items.length);
            setNotice(true, "Product has been added to cart!", "green");
          }
          else {
            setNotice(true, "Error adding to cart!", "red");
          }
        }
      }
    }
    else if (product.quantity === 0) {
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
      <Box
        className="product-item position-relative"
        sx={{
          width: '100%',
          height: '350px',
          display: 'flex',
          flexDirection: 'column',
          //border: '1px solid #ccc',
          borderRadius: '8px',
          overflow: 'hidden',  // Đảm bảo không có phần dư thừa khi hover
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'scale(1.05)', // Phóng to nhẹ khi hover
          },
        }}
      >
        <Box
          className="img-wrapper position-relative"
          sx={{
            height: '100%',
            overflow: 'hidden',
            position: 'relative',
            '& img': {
              objectFit: 'contain',
              width: '100%',
              height: '100%',
              transition: 'transform 0.3s ease',
            },
            '&:hover img': {
              transform: 'scale(1.1)', // Tăng kích thước ảnh khi hover
            },
          }}
        >
          <img src={product.image} alt={product.name} />
          {product.quantity === 0 && (
          <span className="badge bg-primary position-absolute">Out of stock</span>
          )}
        </Box>

        <Box className="product-info w-100" sx={{ padding: '10px', height: '100px', overflow: 'hidden' }}>
          <p
            className="name"
            style={{
              fontSize: '16px',
              fontWeight: 'bold',
              whiteSpace: 'nowrap',       // Ngăn cách dòng mới
              overflow: 'hidden',         // Ẩn phần dư thừa
              textOverflow: 'ellipsis',   // Hiển thị ba chấm khi văn bản quá dài
            }}
          >
            {product.name}
          </p>
          <div className="row d-flex align-items-center" style={{ fontSize: '14px' }}>
            <div className="col-md-6">
              <p className="net-price">${product.price}</p>
            </div>

            <div className="col-md-6">
              {/* {product.oldPrice && <p className="old-price">${product.oldPrice}</p>} */}
            </div>
          </div>
        </Box>


        <div className="bg-hover position-absolute" style={{ height: '100%' }}></div>

      <div className="product-hover position-absolute d-flex align-items-center justify-content-center flex-column" style={{ height: '100%' }}>
        <Button onClick={handleProductClick}>See details</Button>
        <div className='mt-2'></div>
        {product.quantity === 0 
        ? <Button disabled onClick={handleAddToCart}>Add to cart</Button> 
        : <Button onClick={handleAddToCart}>Add to cart</Button>} 
      </div>
    </Box>
    </>
  );
};

export default ProductItem;

