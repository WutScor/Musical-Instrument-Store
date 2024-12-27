import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import ProductItem from "../home/home-products/product-item";

const ProductRelated = ({ products }) => {
  return (
    <>
    {/* Sản phẩm liên quan */}
      <div className="related-container">
        <h2 className="m-auto text-center mb-4">Related Products</h2>
        <div className="container-w3 mt-5">
          <div className="products-row w-100 d-flex">
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
          </div>
        </div>
        <Link to={'/shop'} className="btn-container"><Button className="sm-button">Show More</Button></Link>
      </div>
    </>
  );
};

export default ProductRelated;
