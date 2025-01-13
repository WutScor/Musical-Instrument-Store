import React from "react";
import { useLocation } from "react-router-dom";
import AccountForm from "../../components/Admin/accounts/account-form";

const AddAccount = () => {
    const location = useLocation();
    const { users } = location.state || {};
    return (
        <div>
        <h2 style={{ fontWeight: "bold" }}>Add New Account</h2>
        <AccountForm user={null} users={users} />
        </div>
    );
};

export default AddAccount;