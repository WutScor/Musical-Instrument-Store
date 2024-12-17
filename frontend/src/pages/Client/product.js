import Headline from "../../components/main/products/product-headline";
import ShowProductDetail from "../../components/main/products/product-detail";
import DescriptionTab from "../../components/main/products/product-description";
import ProductRelated from "../../components/main/products/product-related";

const ProductDetail = () => {
  return (
    <>
      <Headline />
      <ShowProductDetail />
      <DescriptionTab />
      <ProductRelated />
    </>
  );
};

export default ProductDetail;
