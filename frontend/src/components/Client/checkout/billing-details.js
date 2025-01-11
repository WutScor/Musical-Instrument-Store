import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { useState } from "react";

const BillingDetails = forwardRef((props, ref) => {
    const formRef = useRef();

    const [errorStatus, setErrorStatus] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useImperativeHandle(ref, () => ({
        getBillingDetails: () => {
            const formData = new FormData(formRef.current);
            const billingDetails = {};
            formData.forEach((value, key) => {
                billingDetails[key] = value;
            });
            return billingDetails;
        },
        validateForm: () => {
            const formData = new FormData(formRef.current);
            if (!formData.get('firstName')) {
                setErrorStatus('firstName');
                setErrorMessage('First name is required');
                return false;
            }
            if (!formData.get('lastName')) {
                setErrorStatus('lastName');
                setErrorMessage('Last name is required');
                return false;
            }
            if (!formData.get('streetAddress')) {
                setErrorStatus('streetAddress');
                setErrorMessage('Street address is required');
                return false;
            }
            if (!formData.get('phoneNumber')) {
                setErrorStatus('phoneNumber');
                setErrorMessage('Phone number is required');
                return false;
            }
            if (!formData.get('emailAddress')) {
                setErrorStatus('emailAddress');
                setErrorMessage('Email address is required');
                return false;
            }
            return true;
        }
    }));


    return (
        <>
            <h1>Billing Details</h1>
            <form ref={formRef} className="d-flex flex-column w-100 gap-4 mt-4">
                <div className="d-flex w-100 justify-content-between gap-4">
                    <div className="w-50">
                        <h6>First Name</h6>
                        <input className="billing-input" type="text" name="firstName" id="firstName" required style={{ border: errorStatus === 'firstName' ? "1px solid red" : "1px solid #9F9F9F" }} onFocus={() => {
                            if (errorStatus === 'firstName') {
                                setErrorStatus('');
                                setErrorMessage('');
                            }
                        }} />
                        {errorStatus === 'firstName' && (<p className="text-danger">{errorMessage}</p>)}
                    </div>
                    <div className="w-50">
                        <h6>Last Name</h6>
                        <input className="billing-input" type="text" name="lastName" id="lastName" required style={{ border: errorStatus === 'lastName' ? "1px solid red" : "1px solid #9F9F9F" }} onFocus={() => {
                            if (errorStatus === 'lastName') {
                                setErrorStatus('');
                                setErrorMessage('');
                            }
                        }}/>
                        {errorStatus === 'lastName' && (<p className="text-danger">{errorMessage}</p>)}
                    </div>
                </div>
                <div>
                    <h6>Country / Region</h6>
                    <select name="country" id="country" className="form-select billing-input" style={{ color: "gray" }}>
                        <option value="Nigeria">Vietnam</option>
                        <option value="Ghana">China</option>
                        <option value="Kenya">Thailand</option>
                        <option value="South Africa">Singapore</option>
                        {/* Thêm option ... */}
                    </select>
                </div>
                <div>
                    <h6>Street Address</h6>
                    <input className="billing-input" type="text" name="streetAddress" id="streetAddress" required style={{ border: errorStatus === 'streetAddress' ? "1px solid red" : "1px solid #9F9F9F" }} onFocus={() => {
                        if (errorStatus === 'streetAddress') {
                            setErrorStatus('');
                            setErrorMessage('');
                        }
                    }} />
                    {errorStatus === 'streetAddress' && (<p className="text-danger">{errorMessage}</p>)}
                </div>
                <div>
                    <h6>Town / City</h6>
                    <input className="billing-input" type="text" name="townCity" id="townCity" required />
                </div>
                <div>
                    <h6>Phone</h6>
                    <input className="billing-input" type="tel" name="phoneNumber" id="phoneNumber" required style={{ border: errorStatus === 'phoneNumber' ? "1px solid red" : "1px solid #9F9F9F" }} onFocus={() => {
                        if (errorStatus === 'phoneNumber') {
                            setErrorStatus('');
                            setErrorMessage('');
                        }
                    }} />
                    {errorStatus === 'phoneNumber' && (<p className="text-danger">{errorMessage}</p>)}
                </div>
                <div>
                    <h6>Email Address</h6>
                    <input className="billing-input" type="email" name="emailAddress" id="emailAddress" required style={{ border: errorStatus === 'emailAddress' ? "1px solid red" : "1px solid #9F9F9F" }} onFocus={() => {
                        if (errorStatus === 'emailAddress') {
                            setErrorStatus('');
                            setErrorMessage('');
                        }
                    }} />
                    {errorStatus === 'emailAddress' && (<p className="text-danger">{errorMessage}</p>)}
                </div>
                <div>
                    <h6>Additional Information</h6>
                    <input className="billing-input" type="text" name="additionalInfo" id="additionalInfo" required placeholder="Additional information" style={{ color: "lightgray" }} />
                </div>
            </form>
        </>
    )
});

export default BillingDetails;