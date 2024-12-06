

const ProductItem = () => {
    return(
        <>
            <div className="product-item">
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
                </div>
            </div>
        </>
    )
}

export default ProductItem;