import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import UserInfo from "../../components/Client/home/user/user-info";


const UserPage = () => {
    return(
        <>
            <div className="main d-flex justify-content-center align-items-center user-page">
                <div className="container-w1">
                    <div className="d-flex align-items-center justify-content-center flex-column textZone">
                        <UserInfo/>
                        <Link to={'/auth/signin'} className="mt-4"><Button>Sign In</Button></Link>
                        <Link to={'/auth/signup'} className="mt-4"><Button>Sign Up</Button></Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserPage;