import React from "react";
import Slider from "react-slick";

const HomeSlider = () => {

    var settings = {
        dots: true,
        infinite: true,
        speed: 666,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000
    };

    return(
        <>
            <div className="home-slider mb-5">
                <Slider {...settings}>
                    <div className="item">
                        <img src="https://r4.wallpaperflare.com/wallpaper/614/202/340/play-fender-stratocaster-blue-guitar-strat-wallpaper-f9e0589db11a2d8b06f7187fc05186fd.jpg" className="w-100"/>
                    </div>

                    <div className="item">
                        <img src="https://r4.wallpaperflare.com/wallpaper/367/616/1014/music-ghost-piano-musical-instrument-wallpaper-69e0780d717acd9b16b7480fe011e6fd.jpg" className="w-100"/>
                    </div>
                </Slider>
            </div>
        </>
    )
}

export default HomeSlider;