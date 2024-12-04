import { NavLink } from "react-router-dom";

export default function Footer() {
    return (
        <div className="container-fluid bg-secondary text-dark mt-5 pt-5">
            <div className="row px-xl-5 pt-5">
                <div className="col-lg-4 col-md-12 mb-5 pr-3 pr-xl-5">
                    <NavLink to="/home" className="text-decoration-none">
                        <h1 className="mb-4 display-5 font-weight-semi-bold"><span className="text-primary font-weight-bold border border-white px-3 mr-1">E</span>Shopper</h1>
                    </NavLink>
                    <p>Web final project 2023</p>
                    <p className="mb-2"><i className="fa fa-map-marker-alt text-primary mr-3"></i>Linh Trung, Thu Duc</p>
                </div>
                <div className="col-lg-4 col-md-12">
                    <div className="row">
                        <div className="col-md-6 mb-5">
                            <h5 className="font-weight-bold text-dark mb-4">Quick Links</h5>
                            <div className="d-flex flex-column justify-content-start">
                                <NavLink className="text-dark mb-2" to="/home"><i className="fa fa-angle-right mr-2"></i>Home</NavLink>
                                <NavLink className="text-dark mb-2" to="/shop"><i className="fa fa-angle-right mr-2"></i>Our Shop</NavLink>
                                <NavLink className="text-dark mb-2" to="/cart"><i className="fa fa-angle-right mr-2"></i>Shopping Cart</NavLink>
                                <NavLink className="text-dark" to="/contact"><i className="fa fa-angle-right mr-2"></i>Contact Us</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-12">
                    <div className="row">
                        <div className="col-md-8 mb-5">
                            <h5 className="font-weight-bold text-dark mb-4">Developed by.</h5>
                            <div className="d-flex flex-column justify-content-start">
                                <p className="text-dark m-0">Nguyen Van Sieu</p>
                                <p className="text-dark m-0">Luu Vinh Quang</p>
                                <p className="text-dark m-0">Hoang Van Quoc</p>
                                <p className="text-dark m-0">Bui Duc Thinh</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row border-top border-light mx-xl-5 py-4">
                <div className="col-md-6 px-xl-0">
                    <p className="mb-md-0 text-center text-md-left text-dark">
                        &copy; <a className="text-dark font-weight-semi-bold" href="#">EShopper</a>. All Rights Reserved. Designed
                        by <a className="text-dark font-weight-semi-bold" href="https://htmlcodex.com">HTML Codex</a>
                    </p>
                </div>
                <div className="col-md-6 px-xl-0 text-center text-md-right">
                    <img className="img-fluid" src="img/payments.png" alt="" />
                </div>
            </div>
        </div>
    );
};