

const BillingDetails = () => {
    return (
        <>
            <h1>Billing Details</h1>
            <form action="" className="d-flex flex-column w-100 gap-4 mt-4">
                <div className="d-flex w-100 justify-content-between gap-4">
                    <div className="w-50">
                        <h6>First Name</h6>
                        <input className="billing-input" type="text" name="firstName" id="firstName" required />
                    </div>
                    <div className="w-50">
                        <h6>Last Name</h6>
                        <input className="billing-input" type="text" name="lastName" id="lastName" required />
                    </div>
                </div>
                <div>
                    <h6>Company Name (Optional)</h6>
                    <input className="billing-input" type="text" name="companyName" id="companyName" />
                </div>
                <div>
                    <h6>Country / Region</h6>
                    <select name="country" id="country" className="billing-input" style={{color: "gray"}}>
                        <option value="Nigeria">Vietnam</option>
                        <option value="Ghana">China</option>
                        <option value="Kenya">Thailand</option>
                        <option value="South Africa">Singapore</option>
                        {/* Thêm option ... */}
                    </select>
                </div>
                <div>
                    <h6>Street Address</h6>
                    <input className="billing-input" type="text" name="streetAddress" id="streetAddress" required />
                </div>
                <div>
                    <h6>Town / City</h6>
                   <input className="billing-input" type="text" name="townCity" id="townCity" required />
                </div>
                <div>
                    <h6>Province</h6>
                   <input className="billing-input" type="text" name="province" id="province" required />
                </div>
                <div>
                    <h6>Zip Code</h6>
                   <input className="billing-input" type="number" name="zipCode" id="zipCode" required />
                </div>
                <div>
                    <h6>Phone</h6>
                   <input className="billing-input" type="number" name="phoneNumber" id="phoneNumber" required />
                </div>
                <div>
                    <h6>Email Address</h6>
                   <input className="billing-input" type="email" name="emailAddress" id="emailAddress" required />
                </div>
                <div>
                    <h6>Additional Information</h6>
                   <input className="billing-input" type="text" name="additionalInfo" id="additionalInfo" required placeholder="Additional information" style={{color: "lightgray"}}/>
                </div>
            </form>
        </>
    )
}

export default BillingDetails;