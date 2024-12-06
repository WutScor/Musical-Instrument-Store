import HomeSlider from "../../components/main/home-slider/home-slider";


const HomePage = () => {
    return(
        <>
            <HomeSlider/>
            
            <div className="main d-flex justify-content-center align-items-center flex-column">
                <div className="container-w1">
                    <div className="d-flex align-items-center justify-content-center textZone flex-column">
                        <h1>THIS IS HOME PAGE</h1>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage;