import { FaAngleRight } from "react-icons/fa6";

const Headline = () => {
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
            <p>Name</p>
        </div>
      </div>
    </>
  );
};

export default Headline;
