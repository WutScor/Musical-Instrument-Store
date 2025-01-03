import { FaAngleRight } from "react-icons/fa6";

const Headline = ({product}) => {
  // Đây là phần giới thiệu ở đầu trang chi tiết sản phẩm thôi, không có gì to tát :D
  const {name} = product;
  return (
    <>
      <div className="product-headline d-flex">
        <div className="headline-info">
          <p className="headline-text">Home</p>
          <FaAngleRight className="" />
          <p className="headline-text">Shop</p>
          <FaAngleRight className="" />
        </div>
        <div>
            <p>{name}</p>
        </div>
      </div>
    </>
  );
};

export default Headline;
