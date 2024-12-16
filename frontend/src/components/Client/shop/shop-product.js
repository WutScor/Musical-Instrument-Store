import { Button } from "@mui/material";
import { AiOutlineShareAlt, AiOutlineSwap, AiOutlineHeart } from "react-icons/ai";

const ProductItem = ({ product }) => {
  return (
    <div className="product-item position-relative">
      <div className="img-wrapper position-relative">
        {/* Đảm bảo ảnh có kích thước phù hợp */}
        <img src={product.image} alt={product.name} className="w-100" />
        {/* {product.discount && (
          <span className="badge bg-primary position-absolute">-{product.discount}%</span>
        )} */}
      </div>

      <div className="product-info w-100">
        <p className="name">{product.name}</p>
        {/* <p className="short-desc">{product.shortDesc}</p> */}
        <div className="row d-flex align-items-center">
          <div className="col-md-6">
            {/* <p className="net-price">${product.netPrice}</p> */}
          </div>

          <div className="col-md-6">
            {/* {product.oldPrice && <p className="old-price">${product.oldPrice}</p>} */}
          </div>
        </div>
      </div>

      <div className="bg-hover position-absolute"></div>

      <div className="product-hover position-absolute d-flex align-items-center justify-content-center flex-column">
        <Button>Add to cart</Button>

        <div className="d-flex justify-content-between align-items-center w-100 px-3 mt-4">
          <div className="item">
            <AiOutlineShareAlt /><p>Share</p>
          </div>
          <div className="item">
            <AiOutlineSwap /><p>Compare</p>
          </div>
          <div className="item">
            <AiOutlineHeart /><p>Like</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
