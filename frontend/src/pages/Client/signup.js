import SignUpForm from "../../components/Client/home/signup/signup-form";
import { Button } from "@mui/material";

const SignUpPage = () => {
    return(
        <>
            <div className="main d-flex justify-content-center align-items-center">
                <div className="container-w5">
                    <div className="d-flex align-items-center justify-content-center flex-column textZone mt-5">
                        <h1>THIS IS SIGNUP PAGE</h1>
                        <p className="short-desc">Sign mtfk up u dawg!!</p>

                        <SignUpForm/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUpPage;