import { Link } from "react-router-dom";
import { Button, Grid } from "@mui/material";
import ProductItem from "../shop/shop-product";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const ProductRelated = ({ productRelated }) => {
  // console.log(productRelated);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [visibleIndex, setVisibleIndex] = useState(0);       // Index của sản phẩm đầu tiên

  useEffect(() => {
    axios.get(`/musical_instruments/${productRelated.id}/related?page=1&limit=8`)
      .then(response => {
        setRelatedProducts(response.data.items);
      })
      .catch(error => {
        console.error('Error fetching related products:', error);
      });
  }, [productRelated.id]);

  // Hiển thị sản phẩm tiếp theo
  const handleNext = () => {
    setVisibleIndex((prev) => Math.min(prev + 1, relatedProducts.length - 4));
    // console.log(visibleIndex);
  }

  // Hiển thị sản phẩm trước
  const handlePrev = () => {
    setVisibleIndex((prev) => Math.max(prev - 1, 0));
    // console.log(visibleIndex);
  }

  const visibleProducts = relatedProducts.slice(visibleIndex, visibleIndex + 4);

  // Router

  return (
    <>
      {/* Sản phẩm liên quan */}
      <div className="related-container">
        <h2 className="m-auto text-center mb-4">Related Products</h2>
        <div className="container-w4 mt-5 d-flex align-items-center justify-content-center gap-5">
          <FaAngleLeft className="arrow-left" onClick={handlePrev} style={{ cursor: visibleIndex > 0 ? "pointer" : "default", opacity: visibleIndex > 0 ? 1 : 0.5, backgroundColor: visibleIndex > 0 ? "#ededed" : "transparent" }} />
          <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
            {visibleProducts.map(product => (
              <Grid item xs={12} sm={6} md={3} key={product.id}>
                <ProductItem product={product}/>
              </Grid>
            ))}
          </Grid>
          <FaAngleRight className="arrow-right" onClick={handleNext} style={{ cursor: visibleIndex < relatedProducts.length / 2 ? "pointer" : "default", opacity: visibleIndex < relatedProducts.length / 2 ? 1 : 0.5, backgroundColor: visibleIndex < relatedProducts.length / 2 ? "#ededed" : "transparent" }} />
        </div>
        <Link to={'/shop'} className="btn-container"><Button className="sm-button">Show More</Button></Link>
      </div>
    </>
  );
};

export default ProductRelated;
