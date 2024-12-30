import SignInForm from "../../components/Client/signin/signin-form";

const SignInPage = () => {
    return(
        <>
            <div className="main d-flex justify-content-center align-items-center">
                <div className="container-w5">
                    <div className="d-flex align-items-center justify-content-center flex-column textZone mt-5">
                        <h1>THIS IS SIGNIN PAGE</h1>
                        <p className="short-desc">Sign mtfk in u dawg!!</p>

                        <SignInForm/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignInPage;