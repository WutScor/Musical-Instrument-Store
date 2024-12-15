import { Link } from "react-router-dom";



const HeaderLogo = () => {
    return(
        <>
            <div className="logo me-auto">
                <Link to={'/'}><h3 className="fw-bold">Sickalinz</h3></Link>
            </div>
        </>
    )
}

export default HeaderLogo;