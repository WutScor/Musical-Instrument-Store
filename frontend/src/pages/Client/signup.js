import { Link } from "react-router-dom";
import SignUpForm from "../../components/Client/home/signup/signup-form";
import { Button } from "@mui/material";

const SignUpPage = () => {
    return(
        <>
            <div className="main d-flex justify-content-center align-items-center">
                <div className="container-w5">
                    <div className="d-flex align-items-center justify-content-center flex-column textZone mt-5">
                        <h1>Sign Up</h1>
                        <p className="short-desc"> Sign up to create an account and get access to our services.</p>

                        <SignUpForm/>

                        <div className="mb-5"></div>
                        <p className="short-desc mt-5">Already have an account?</p>
                        <Link to={'/auth/signin'}><Button>Sign In</Button></Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUpPage;