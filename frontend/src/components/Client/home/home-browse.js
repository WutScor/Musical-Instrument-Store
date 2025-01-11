import { Link } from "react-router-dom";
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
                    <h1 
                        className="title mt-5 text-transform-none"
                    >
                        Explore Our Musical Collection, {context.user ? 
                            (<Link to='/user'>{context.user.username}</Link>) : 
                            (<Link to='/auth/signin'>Guest</Link>)}
                    </h1>
                    <p className="title-desc">
                        Discover a wide range of instruments tailored for every musician, from beginners to professionals.
                    </p>
                    <div className="coming-soon mt-3">
                        <h2 className="text-muted"><em>--COMING SOON--</em></h2>
                    </div>
                        <div className="container-w2 mt-3">
                            <div className="align-w-box">
                                <div className="row">
                                    <div className="col-md-4 d-flex align-items-center flex-column">
                                        <div className="img-container d-flex align-items-end">
                                            <img src="https://r4.wallpaperflare.com/wallpaper/668/879/585/anime-anime-girls-bocchi-the-rock-musical-instrument-hd-wallpaper-8a881564d2120db7bfe52782fcbd57d0.jpg"
                                                className="cursor w-100" alt=""/>
                                        </div>

                                        <p className="my-4 browse-tag">Drums</p>
                                    </div>
                                    <div className="col-md-4 d-flex align-items-center flex-column">
                                        <div className="img-container d-flex align-items-center">
                                            <img src="https://r4.wallpaperflare.com/wallpaper/668/879/585/anime-anime-girls-bocchi-the-rock-musical-instrument-hd-wallpaper-8a881564d2120db7bfe52782fcbd57d0.jpg"
                                                className="cursor w-100" alt=""/>
                                        </div>

                                        <p className="my-4 browse-tag">Guitar</p>
                                    </div>
                                    <div className="col-md-4 d-flex align-items-center flex-column">
                                        <div className="img-container">
                                            <img src="https://r4.wallpaperflare.com/wallpaper/668/879/585/anime-anime-girls-bocchi-the-rock-musical-instrument-hd-wallpaper-8a881564d2120db7bfe52782fcbd57d0.jpg"
                                                className="cursor w-100" alt=""/>
                                        </div>

                                        <p className="my-4 browse-tag">Legs ( ͡• ͜ʖ ͡• )</p>
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