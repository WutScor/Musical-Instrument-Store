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
import { useContext } from 'react';
import { AuthContext } from '../../../context/authContext';
import { addToSessionCart } from '../cart/add-to-cart-session';

const ProductItem = ({ product }) => {
  const navigate = useNavigate();
  const context = useContext(AuthContext);

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


  const handleAddToCart = () => {
    const token = context.token;
    if(!token) {
      addToSessionCart(product, 1);
    }
    // else {

    // }
  }

  return (
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
        <Button onClick={handleAddToCart}>Add to cart</Button>
      </div>
    </Box>
  );
};

export default ProductItem;

