import FooterBrand from "./footer-brand/footer-brand";
import FooterLinks from "./footer-links/footer-links";
import FooterHelp from "./footer-help/footer-help";
import FooterNewsletter from "./footer-newsletter/footer-newsletter";


const Footer = () => {
    return(
        <>
            <div className="footer">
                <div className="container-w1">
                    <div className="container-w4 pt-5">
                        <div className="row">
                            <div className="col-md-4">
                                <FooterBrand/>
                            </div>

                            <div className="col-md-8">
                                <div className="row">
                                    <div className="col-md-3">
                                        <FooterLinks/>
                                    </div>

                                    <div className="col-md-9">
                                        <div className="row">
                                            <div className="col-md-5">
                                               <FooterHelp/>
                                            </div>

                                            <div className="col-md-7">
                                                <FooterNewsletter/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr/>

                        <div className="copyright py-3">
                            <p>©2024 team <b>Sickalinz.</b> All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer;