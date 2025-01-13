import { Link } from "react-router-dom";
import SignInForm from "../../components/Client/signin/signin-form";
import { Button } from "@mui/material";

const SignInPage = () => {
    return(
        <>
            <div className="main d-flex justify-content-center align-items-center mt-3">
                <div className="container-w5">
                    <div className="d-flex align-items-center justify-content-center flex-column textZone mt-5">
                        <h1>SIGN IN</h1>
                        <p className="short-desc">Sign in to your account to get access to your orders and payments.</p>

                        <SignInForm/>
                        <div className="mb-5"></div>
                        <p className="short-desc mt-5">Don't have an account?</p>
                        <Link to={'/auth/signup'}><Button>Sign Up</Button></Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignInPage;