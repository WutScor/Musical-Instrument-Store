import HomeBrowse from "../../components/main/home/home-browse";
import HomeProducts from "../../components/main/home/home-products/home-products";
import HomeSlider from "../../components/main/home/home-slider";


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