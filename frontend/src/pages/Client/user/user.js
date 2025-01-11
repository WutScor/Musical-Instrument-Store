import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import UserInfo from "../../../components/Client/home/user/user-info";
import { AuthContext } from "../../../context/authContext";
import { useContext } from "react";

const UserPage = () => {

    const context = useContext(AuthContext);

    return(
        <>
            <div className="main d-flex justify-content-center align-items-center user-page mt-4">
                <div className="container-w1">
                    <div className="d-flex align-items-center justify-content-center flex-column textZone">
                        {context.user && <UserInfo name = {context.user.username}/>}
                        {!context.user && <h1 className="mt-4">You are not signed in!</h1>}
                        {!context.user && <Link to={'/auth/signin'} className="mt-4"><Button>Sign In</Button></Link>}
                        {!context.user && <Link to={'/auth/signup'} className="mt-4"><Button>Sign Up</Button></Link>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserPage;