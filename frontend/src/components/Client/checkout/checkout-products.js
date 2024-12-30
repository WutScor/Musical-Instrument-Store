

const CheckoutProducts = ({ products, total }) => {
    // const total = products.reduce((acc, product) => acc + product.price * product.quantity, 0);
    return (
        <>
            <div style={{borderBottom: "2px solid #E5E5E5", paddingBottom: "20px"}}>
                <div className="d-flex justify-content-between">
                    <h4>Product</h4>
                    <h4>Subtotal</h4>
                </div>
                {/* Products */}
                <div className="mb-3">
                    {products.map(product => (
                        <div key={product.id} className="d-flex justify-content-between">
                        <div className="d-flex gap-2">
                            <p>{product.name}</p>
                            {/* Product Quantity */}
                             <div className="d-flex gap-2">
                                <p>x</p>
                                <p>{product.quantity}</p>
                            </div>
                        </div>
                        <p>$ {product.price}</p>
                    </div>
                    ))}
                    {/* Product 1 */}
                    {/* <div className="d-flex justify-content-between mb-2">
                        <div className="d-flex gap-2">
                            <p>Product Name 1</p> */}
                            {/* Product Quantity */}
                            {/* <div className="d-flex gap-2">
                                <p>x</p>
                                <p>1</p>
                            </div>
                        </div>
                        <p>250,000.000</p>
                    </div> */}
                    {/* Product 2 */}
                    {/* <div className="d-flex justify-content-between">
                        <div className="d-flex gap-2">
                            <p>Product Name 2</p> */}
                            {/* Product Quantity */}
                             {/* <div className="d-flex gap-2">
                                <p>x</p>
                                <p>2</p>
                            </div>
                        </div>
                        <p>500,000.000</p>
                    </div> */}
                </div>
                {/* Total */}
                <div className="d-flex justify-content-between">
                    <h5 className="fw-semibold">Total</h5>
                    <h5 className="fw-semibold" style={{color: "#B88E2F"}}>$ {total}</h5>
                </div>
            </div>
        </>
    )
}

export default CheckoutProducts;