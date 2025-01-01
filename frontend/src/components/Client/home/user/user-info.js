import { FaPhone, FaLocationDot } from "react-icons/fa6";

const UserInfo = ({ name }) => {
    return(
        <>
            <div className="user-info mt-3">
                <div className="container-w3">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="user-img position-relative">
                                <div className="user-cover">
                                    <img src="https://images.pexels.com/photos/26447918/pexels-photo-26447918/free-photo-of-cat-lying-next-to-guitar.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                        className="w-100"/>
                                </div>
                                <div className="user-avt position-absolute">
                                    <img src="https://i.pinimg.com/originals/95/4e/0f/954e0f2ab2e4f5ade11b494a479fbf18.jpg"
                                        className="w-100" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="d-flex flex-column">
                                <div className="d-flex align-items-center justify-content-center mt-5">
                                    <h1 className="user-name">{name}</h1>
                                </div>
                                <div className="d-flex flex-column">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="d-flex align-items-center mt-5 justify-content-end">
                                                <FaLocationDot/><h5 className="ms-1 my-0">Address:</h5>
                                            </div>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="d-flex align-items-center mt-5 ms-5">
                                                <h5 className="fw-normal m-0">University of Science - Ho Chi Minh City National University</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex flex-column">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="d-flex align-items-center mt-5 justify-content-end">
                                                <FaPhone/><h5 className="ms-1 my-0">Phone number:</h5>
                                            </div>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="d-flex align-items-center mt-5 ms-5">
                                                <h5 className="fw-normal m-0">0666999666</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserInfo;