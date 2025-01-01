import { AuthContext } from "../../../context/authContext";
import { useContext } from "react";

const HomeBrowse = () => {

    const context = useContext(AuthContext);
    console.log('user', context.user);

    return(
        <>
            <div className="main d-flex justify-content-center align-items-center flex-column">
                <div className="container-w1">
                    <div className="d-flex align-items-center justify-content-center textZone flex-column">
                        <h1 className="title mt-5">Browse the range, {context.user ? context.user.username : 'lil dawg'}</h1>
                        <p className="title-desc">This is the description under those stupid titles...</p>

                        <div className="container-w2 mt-5">
                            <div className="align-w-box">
                                <div className="row">
                                    <div className="col-md-4 d-flex align-items-center flex-column">
                                        <div className="img-container d-flex align-items-end">
                                            <img src="https://r4.wallpaperflare.com/wallpaper/668/879/585/anime-anime-girls-bocchi-the-rock-musical-instrument-hd-wallpaper-8a881564d2120db7bfe52782fcbd57d0.jpg"
                                                className="cursor w-100" alt=""/>
                                        </div>

                                        <p className="mt-4 browse-tag">Guitar</p>
                                    </div>
                                    <div className="col-md-4 d-flex align-items-center flex-column">
                                        <div className="img-container d-flex align-items-center">
                                            <img src="https://r4.wallpaperflare.com/wallpaper/668/879/585/anime-anime-girls-bocchi-the-rock-musical-instrument-hd-wallpaper-8a881564d2120db7bfe52782fcbd57d0.jpg"
                                                className="cursor w-100" alt=""/>
                                        </div>

                                        <p className="mt-4 browse-tag">Drums</p>
                                    </div>
                                    <div className="col-md-4 d-flex align-items-center flex-column">
                                        <div className="img-container">
                                            <img src="https://r4.wallpaperflare.com/wallpaper/668/879/585/anime-anime-girls-bocchi-the-rock-musical-instrument-hd-wallpaper-8a881564d2120db7bfe52782fcbd57d0.jpg"
                                                className="cursor w-100" alt=""/>
                                        </div>

                                        <p className="mt-4 browse-tag">Leg :P</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomeBrowse;