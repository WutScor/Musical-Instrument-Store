import HeaderIcons from "./header-icons/header-icons";
import HeaderLogo from "./header-logo/header-logo";
import HeaderNav from "./header-nav/header-nav";


const Header = () => {
    return(
        <>
            <header className="header d-flex justify-content-center sticky-top">
                    <div className="d-flex align-items-center text-align-center container-w1">
                        <HeaderLogo/>
                        <div className="d-flex align-items-center ms-auto header-child">
                            <HeaderNav/>
                            <HeaderIcons/>
                        </div>
                    </div>
            </header>
        </>
    )
}

export default Header;