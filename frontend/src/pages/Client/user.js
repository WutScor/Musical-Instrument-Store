import { Button, DialogContentText } from "@mui/material";
import { Link } from "react-router-dom";
import UserInfo from "../../components/Client/home/user/user-info";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";

const UserPage = () => {

    const context = useContext(AuthContext);
    console.log('user', context.user);
    const navigate = useNavigate();

    const handleLogout = () => {
        context.logout();
        navigate('/');
    }

    return(
        <>
            <div className="main d-flex justify-content-center align-items-center user-page">
                <div className="container-w1">
                    <div className="d-flex align-items-center justify-content-center flex-column textZone">
                        {context.user && <UserInfo name = {context.user.username}/>}
                        {!context.user && <Link to={'/auth/signin'} className="mt-4"><Button>Sign In</Button></Link>}
                        {!context.user && <Link to={'/auth/signup'} className="mt-4"><Button>Sign Up</Button></Link>}
                        {context.user && <button onClick={handleLogout} className="btn btn-danger mt-3">Logout</button>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserPage;