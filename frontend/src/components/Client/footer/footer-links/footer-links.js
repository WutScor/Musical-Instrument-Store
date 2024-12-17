import { Link } from "react-router-dom";

const FooterLinks = () => {
    return(
        <>
            <p className="top-title">Links</p>

            <div className="d-flex flex-column justify-content-between flink-container">
                <div className="a-container d-flex flex-row">
                    <Link to={'/'}>Home</Link>
                </div>
                <div className="a-container d-flex flex-row">
                    <Link to={'/shop'}>Shop</Link>
                </div>
                <div className="a-container d-flex flex-row">
                    <Link to={'/about'}>About</Link>
                </div>
                <div className="a-container d-flex flex-row">
                    <Link to={'/contact'}>Contact</Link>
                </div>
            </div>
        </>
    )
}

export default FooterLinks;