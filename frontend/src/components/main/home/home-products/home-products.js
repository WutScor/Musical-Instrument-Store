import ProductItem from "./product-item";


const HomeProducts = () => {
    return(
        <>
            <div className="main d-flex justify-content-center align-items-center flex-column">
                <div className="container-w1">
                    <div className="d-flex align-items-center justify-content-center textZone flex-column">
                        <h1 className="title mt-5">Our Products</h1>
                        <p className="title-desc">This is the description under those stupid titles...</p>

                        <div className="container-w3 mt-5">
                            <div className="products-row w-100 d-flex">
                                <ProductItem/>
                                <ProductItem/>
                                <ProductItem/>
                                <ProductItem/>
                                <ProductItem/>
                                <ProductItem/>
                                <ProductItem/>
                                <ProductItem/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomeProducts;