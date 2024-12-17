import { Link } from "react-router-dom";


const HeaderNav = () => {
    return(
        <>
            <div className="header-nav me-auto d-flex justify-content-between">
                <Link to={'/'}>Home</Link>
                <Link to={'/shop'}>Shop</Link>
                <Link to={'/about'}>About</Link>
                <Link to={'/contact'}>Contact</Link>
            </div>
        </>
    )
}

export default HeaderNav;