import { formattedPrice } from "../cart/format-price";

const CheckoutProducts = ({ products, total }) => {
    // const total = products.reduce((acc, product) => acc + product.price * product.quantity, 0);
    return (
        <>
            <div style={{borderBottom: "2px solid #E5E5E5", paddingBottom: "20px"}}>
                <div className="d-flex justify-content-between">
                    <h4>Product</h4>
                    <h4 style={{width: '20%'}}>Subtotal</h4>
                </div>
                {/* Products */}
                <div className="mb-3">
                    {products.map(product => (
                        <div key={product.musical_instrument.id} className="d-flex justify-content-between">
                        <div className="d-flex" style={{width: '55%'}}>
                            <p style={{width: '80%'}}>{product.musical_instrument.name}</p>
                            {/* Product Quantity */}
                             <div className="d-flex gap-2">
                                <p>x</p>
                                <p style={{color: 'green', fontWeight:'600'}}>{product.quantity}</p>
                            </div>
                        </div>
                        <p className="text-start" style={{width: '18%'}}>{formattedPrice(product.musical_instrument.price)}</p>
                    </div>
                    ))}
                </div>
                {/* Total */}
                <div className="d-flex justify-content-between">
                    <h5 className="fw-semibold">Total</h5>
                    <h5 className="fw-semibold" style={{color: "#B88E2F"}}>{formattedPrice(total)}</h5>
                </div>
            </div>
        </>
    )
}

export default CheckoutProducts;