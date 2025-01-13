import { AuthContext } from "../../../../context/authContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import UserLink from "./user-link";

const UserInfo = ({ name }) => {

    const context = useContext(AuthContext);
    console.log('user', context.user);
    const navigate = useNavigate();

    const handleLogout = () => {
        context.logout();
        navigate('/');
    }

    const handleEditProfile = () => {
        navigate('/user/edit');
    }

    return(
        <>
            <div className="user-info mt-3">
                <div className="container-w3">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="user-img position-relative w-100">
                                <div className="user-cover">
                                    <img src="https://images.pexels.com/photos/26447918/pexels-photo-26447918/free-photo-of-cat-lying-next-to-guitar.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                        className="w-100"/>
                                </div>
                                <div className="user-avt position-absolute">
                                    <img src={context.user.avatar}
                                        className="w-100" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="d-flex flex-column">
                                <div className="d-flex align-items-center justify-content-center mt-5">
                                    <h1 className="user-name">{name}</h1>
                                </div>

                                <div className="d-flex align-items-center justify-content-center">
                                    <h5 className="user-email fw-light text-muted">{context.user.email}</h5>
                                </div>
                                <div className="row mt-3 link-container">
                                    <div className="col-md-6 d-flex align-items-center justify-content-center">
                                        <UserLink 
                                            direction='cart' 
                                            imgUrl='https://c7.alamy.com/comp/T725ED/toy-electric-guitar-in-shopping-cart-T725ED.jpg' 
                                        />
                                    </div>
                                    <div className="col-md-6 d-flex align-items-center justify-content-center">
                                        <UserLink 
                                            direction='orders' 
                                            imgUrl='https://www.fedex.com/content/dam/fedex-com/testfolder/FedEx%20custom%20guitar%20box.jpg' 
                                        />
                                    </div>
                                </div>
                                <button onClick={handleEditProfile} className="btn btn-danger mt-4 align-self-center">Edit Profile</button>
                                <button onClick={handleLogout} className="btn btn-danger mt-4 align-self-center">Sign Out</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserInfo;