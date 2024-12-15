

const FooterHelp = () => {
    return(
        <>
             <p className="top-title">Help</p>

            <div className="d-flex flex-column justify-content-between flink-container">
                <div className="a-container d-flex flex-row">
                    <a>Payment Options</a>
                </div>
                <div className="a-container d-flex flex-row">
                    <a>Returns</a>
                </div>
                <div className="a-container d-flex flex-row">
                    <a>Privacy Policies</a>
                </div>
                <div className="a-container d-flex flex-row">
                    <a className="visibility-hidden">a</a>
                </div>
            </div>
        </>
    )
}

export default FooterHelp;