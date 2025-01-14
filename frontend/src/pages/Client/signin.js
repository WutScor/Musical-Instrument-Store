import { Link } from "react-router-dom";
import SignInForm from "../../components/Client/signin/signin-form";
import { Button } from "@mui/material";

const SignInPage = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg, #cd9b33, #FFE8D0)",
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
            Sign In
          </h1>
          <p
            className="text-muted mb-4"
            style={{
              fontSize: "14px",
            }}
          >
            Sign in to your account to get access to your orders and payments.
          </p>

          <SignInForm />

          <p className="text-muted mt-4 mb-2" style={{ fontSize: "14px" }}>
            Don't have an account?
          </p>
          <Link to="/auth/signup" className="text-decoration-none">
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
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;