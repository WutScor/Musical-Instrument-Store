import React from "react";
import Slider from "react-slick";
import { useNavigate } from 'react-router-dom';

const HomeSlider = () => {

    var settings = {
        dots: true,
        infinite: true,
        speed: 666,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000
    };

    const navigate = useNavigate();

    const handleImageClick = (category_id) => {
        navigate('/shop', {
        state: { filters: { category: category_id } }
        });
    };

    return(
        <>
            <div className="home-slider mb-5">
                <Slider {...settings}>
                    <div className="item">
                        <img 
                        src="https://r4.wallpaperflare.com/wallpaper/614/202/340/play-fender-stratocaster-blue-guitar-strat-wallpaper-f9e0589db11a2d8b06f7187fc05186fd.jpg"
                        className="w-100" 
                        alt=""
                        onClick={() => handleImageClick(1)}
                        style={{ cursor: 'pointer' }}
                        />
                    </div>

                    <div className="item">
                        <img 
                        src="https://r4.wallpaperflare.com/wallpaper/367/616/1014/music-ghost-piano-musical-instrument-wallpaper-69e0780d717acd9b16b7480fe011e6fd.jpg" 
                        className="w-100" 
                        alt=""
                        onClick={() => handleImageClick(2)}
                        style={{ cursor: 'pointer' }}
                        />
                    </div>

                    <div className="item">
                        <img 
                        src="https://r4.wallpaperflare.com/wallpaper/75/345/131/abstraction-retro-music-silver-wallpaper-6970beaafc02067a905ff51559179a7b.jpg" 
                        className="w-100"
                        alt=""
                        onClick={() => handleImageClick(3)}
                        style={{ cursor: 'pointer' }}
                        />
                    </div>

                    <div className="item">
                        <img 
                        src="https://r4.wallpaperflare.com/wallpaper/912/488/45/marshall-amplifier-studio-hd-2-black-and-gray-marshall-guitar-amplifiers-wallpaper-78f68cbaaf8c0789be0039b2c2c9db00.jpg" 
                        className="w-100"
                        alt=""
                        onClick={() => handleImageClick(4)}
                        style={{ cursor: 'pointer' }}
                        />
                    </div>

                    <div className="item">
                        <img 
                        src="https://r4.wallpaperflare.com/wallpaper/1006/1019/646/contemporary-flash-indoors-lights-wallpaper-88a6edc860d06c6880fcc11e18f2f44a.jpg" 
                        className="w-100" 
                        alt=""
                        onClick={() => handleImageClick(5)}
                        style={{ cursor: 'pointer' }}
                        />
                    </div>

                    <div className="item d-flex align-items-center">
                        <img 
                        src="https://r4.wallpaperflare.com/wallpaper/712/429/286/saxophone-man-face-lips-wallpaper-7019be535bf19dfa802067fe3854bbed.jpg" 
                        className="w-100" 
                        alt=""
                        onClick={() => handleImageClick(6)}
                        style={{ cursor: 'pointer' }}
                        />
                    </div>
                </Slider>
            </div>
        </>
    )
}

export default HomeSlider;