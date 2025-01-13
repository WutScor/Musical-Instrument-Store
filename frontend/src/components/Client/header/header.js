import React, { useState, useEffect } from "react";
import HeaderIcons from "./header-icons/header-icons";
import HeaderLogo from "./header-logo/header-logo";
import HeaderNav from "./header-nav/header-nav";
import { IoIosMenu } from "react-icons/io";
import { Button } from "@mui/material";

const useWindowWidth = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);

        // Dọn dẹp sự kiện khi component unmount
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowWidth;
};

const Header = () => {
    const windowWidth = useWindowWidth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <>
            <header className="header d-flex justify-content-center sticky-top">
                <div className="d-flex align-items-center text-align-center container-w1">
                    <div className="row w-100">
                        <div className="col-md-4">
                            <HeaderLogo />
                        </div>
                        {windowWidth <= 768 ? (
                            <div className="toggle-container">
                                <Button 
                                    className="menu-toggle" 
                                    onClick={toggleMenu}
                                    aria-label="Toggle menu"
                                >
                                    <IoIosMenu size={24} />
                                </Button>
                            </div>
                        ) : (
                            <div className="col-md-8 d-flex justify-content-between align-items-center">
                                <div className="row w-100">
                                    <div className="col-md-6 d-flex align-items-center">
                                        <HeaderNav />
                                    </div>
                                    <div className="col-md-6">
                                        <div className="row w-100">
                                            <div className="col-md-4"></div>
                                            <div className="col-md-8">
                                                <HeaderIcons />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {windowWidth <= 768 && isMenuOpen && (
                            <div className={`menu-content ${isMenuOpen ? "open" : ""}`}> 
                                <HeaderNav />
                                <HeaderIcons />
                            </div>
                        )}
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
