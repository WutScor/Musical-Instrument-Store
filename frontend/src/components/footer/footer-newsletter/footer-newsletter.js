import { Button } from "@mui/material";

const FooterNewsletter = () => {
    return(
        <>
            <p className="top-title">Newsletter</p>
        
            <div className="d-flex align-items-start nlt-box">
                <input type="text" className="nlt-inp" placeholder="Enter Your Email Address"></input>
                <Button className="nlt-btn">Subscribe</Button>
            </div>
        </>
    )
}

export default FooterNewsletter;