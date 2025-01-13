import React from "react";
import AccountForm from "../../components/Admin/accounts/account-form";

const AddAccount = () => {
    return (
        <div>
        <h2 style={{ fontWeight: "bold" }}>Add New Account</h2>
        <AccountForm />
        </div>
    );
};

export default AddAccount;