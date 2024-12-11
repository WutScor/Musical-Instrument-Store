import { Button } from "@mui/material";
import { Link } from "react-router-dom";


const UserPage = () => {
    return(
        <>
            <div className="main d-flex justify-content-center align-items-center user-page">
                <div className="container-w1">
                    <div className="d-flex align-items-center justify-content-center flex-column textZone">
                        <h1 className="mt-5">THIS IS USER PAGE</h1>
                        <Link to={'/signin'} className="mt-4"><Button>Sign In</Button></Link>
                        <Link to={'/signup'} className="mt-4"><Button>Sign Up</Button></Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserPage;