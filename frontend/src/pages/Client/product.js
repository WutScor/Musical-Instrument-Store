import Headline from "../../components/Client/products-detail/product-headline";
import ShowProductDetail from "../../components/Client/products-detail/product-detail";
import DescriptionTab from "../../components/Client/products-detail/product-description";
import ProductRelated from "../../components/Client/products-detail/product-related";
import { useLocation } from "react-router-dom";

const ProductDetail = () => {
  const location = useLocation();
  // console.log(location);
  const {product} = location.state || {};
  // console.log(product);
  return (
    <>
      <Headline product={product}/>
      <ShowProductDetail productDetail={product}/>
      <DescriptionTab description={product.description} additional={product.additional_information} reviews={"Test Review"} image={product.image}/>
      <ProductRelated productRelated={product}/>
    </>
  );
};

export default ProductDetail;
