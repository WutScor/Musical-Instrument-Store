import { Link } from "react-router-dom";
import SignUpForm from "../../components/Client/signup/signup-form";
import { Button } from "@mui/material";

const SignUpPage = () => {
    return(
        <>
            <div
                className="d-flex justify-content-center align-items-center vh-100"
                style={{
                    background: "linear-gradient(135deg, #FFF3E3, #FFE8D0)",
                }}
                >
                <div
                    className="card shadow"
                    style={{
                    maxWidth: "600px",
                    width: "100%",
                    border: "none",
                    borderRadius: "16px",
                    //backgroundColor: "#FFF3E3",
                    }}
                >
                    <div className="card-body text-center p-4">
                    <h1
                        className="h4 fw-bold mb-3"
                        style={{
                        color: "#B88E2F",
                        }}
                    >
                        Sign Up
                    </h1>
                    <p
                        className="text-muted mb-4"
                        style={{
                        fontSize: "14px",
                        }}
                    >
                        Sign up to create an account and get access to our services.
                    </p>

                    <SignUpForm/>

                    <p className="text-muted mt-4 mb-2" style={{ fontSize: "14px" }}>
                        Already have an account?   
                    </p>
                    <Link to="/auth/signin" className="text-decoration-none">
                        <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "#B88E2F",
                            color: "#FFFFFF",
                            "&:hover": {
                            backgroundColor: "#A57C28",
                            },
                        }}
                        >
                        Sign In
                        </Button>
                    </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUpPage;