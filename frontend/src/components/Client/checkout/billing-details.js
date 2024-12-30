import React, {forwardRef, useImperativeHandle, useRef} from "react";

const BillingDetails = forwardRef((props, ref) => {
    const formRef = useRef();

    useImperativeHandle(ref, () => ({
        getBillingDetails: () => {
            const formData = new FormData(formRef.current);
            const billingDetails = {};
            formData.forEach((value, key) => {
                billingDetails[key] = value;
            }); 
            return billingDetails;
        }
    }));
    return (
        <>
            <h1>Billing Details</h1>
            <form ref={formRef} className="d-flex flex-column w-100 gap-4 mt-4">
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
                    <h6>Country / Region</h6>
                    <select name="country" id="country" className="form-select billing-input" style={{color: "gray"}}>
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
                    <h6>Phone</h6>
                   <input className="billing-input" type="tel" name="phoneNumber" id="phoneNumber" required />
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
});

export default BillingDetails;