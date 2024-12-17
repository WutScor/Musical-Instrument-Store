import { Button } from "@mui/material";
import { useContext } from "react";
import { AiOutlineShareAlt, AiOutlineSwap, AiOutlineHeart} from "react-icons/ai";
import { MyContext } from "../../../../App";


const ProductItem = () => {

    const context = useContext(MyContext);

    return(
        <>
            <div className="product-item position-relative">
                <div className="img-wrapper position-relative">
                    <img src="https://kadence.in/wp-content/uploads/2024/02/1-72.jpg"
                            className="w-100" />
                    <span className="badge bg-primary position-absolute">-25%</span>
                </div>

          <div className="product-info w-100">
            <p className="name">Name</p>
            <p className="short-desc">Sort desc</p>
            <div className="row d-flex align-items-center">
              <div className="col-md-6">
                <p className="net-price">$40.00</p>
              </div>

                        <div className="col-md-6">
                            <p className="old-price">$30.00</p>
                        </div>
                      </div>
                {/* Removed extra closing div */}
  
                <div className="bg-hover position-absolute"></div>

                <div className="product-hover position-absolute d-flex align-items-center justify-content-center flex-column">
                    <Button onClick={() => context.plusCartItemQtty()}>Add to cart</Button>

                    <div className="d-flex justify-content-between align-items-center w-100 px-4 mt-4">
                        <div className="item">
                            <AiOutlineShareAlt/><p>Share</p>
                        </div>
                        <div className="item">
                            <AiOutlineSwap/><p>Compare</p>
                        </div>
                        <div className="item">
                            <AiOutlineHeart/><p>Like</p>
                        </div>
                    </div>
                </div>
            </div>
          </div>

          <div className="bg-hover position-absolute"></div>

          <div className="product-hover position-absolute d-flex align-items-center justify-content-center flex-column">
            <Button>Add to cart</Button>

            <div className="d-flex justify-content-between align-items-center w-100 px-4 mt-4">
              <div className="item">
                <AiOutlineShareAlt />
                <p>Share</p>
              </div>
              <div className="item">
                <AiOutlineSwap />
                <p>Compare</p>
              </div>
              <div className="item">
                <AiOutlineHeart />
                <p>Like</p>
              </div>
            </div>
          </div>
    </>
  );
};

export default ProductItem;
