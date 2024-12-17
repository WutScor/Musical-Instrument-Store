import HomeBrowse from "../../components/Client/home/home-browse";
import HomeProducts from "../../components/Client/home/home-products/home-products";
import HomeSlider from "../../components/Client/home/home-slider";


const HomePage = () => {
    return(
        <>
            <HomeSlider/>
            <HomeBrowse/>
            <HomeProducts/>
        </>
    )
}

export default HomePage;