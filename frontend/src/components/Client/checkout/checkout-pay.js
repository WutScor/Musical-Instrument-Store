

const CheckoutPayment = ({user}) => {
    return (
        <>
            <div>
                <h4 className="text-center">Account Payment</h4>
                <div className="d-flex justify-content-between w-50">
                    <p>User</p>
                    <p>:</p>
                    <p>{user.username}</p>
                </div>
                <div className="d-flex justify-content-between w-50">
                    <p>Wallet</p>
                    <p>:</p>
                    <p>${user.wallet}</p>
                </div>
            </div>
        </>
    )
}

export default CheckoutPayment;