import Headline from "../../components/Client/products-detail/product-headline";
import ShowProductDetail from "../../components/Client/products-detail/product-detail";
import DescriptionTab from "../../components/Client/products-detail/product-description";
import ProductRelated from "../../components/Client/products-detail/product-related";

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
