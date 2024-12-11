import SignInForm from "../../components/main/signin/signin-form";
import { Button } from "@mui/material";

const SignInPage = () => {
    return(
        <>
            <div className="main d-flex justify-content-center align-items-center">
                <div className="container-w1">
                    <div className="d-flex align-items-center justify-content-center flex-column textZone mt-5">
                        <h1>THIS IS SIGNIN PAGE</h1>
                        <p className="short-desc">Sign mtfk in u dawg!!</p>

                        <SignInForm/>
                        <Button className="mt-5">Sign In</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignInPage;