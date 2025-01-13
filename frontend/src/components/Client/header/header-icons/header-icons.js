import { useState, useEffect } from "react";
import { AiOutlineUser, AiOutlineSearch, AiOutlineHeart, AiOutlineShoppingCart, AiOutlineClose } from "react-icons/ai";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import CartIcon from "./cart-icon/cart-icon";

const HeaderIcons = () => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const search = searchParams.get("search") || "";
    setSearchValue(search);
  }, [searchParams]);

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value.trim() !== "") {
      setSearchParams({ search: value });
    } else {
      setSearchParams({}); 
    }
  };

  useEffect(() => {
    if (searchValue.trim() !== "") {
      navigate(`/shop?search=${searchValue}`); 
    }
  }, [searchValue, navigate]);

  const handleSearchToggle = () => {
    setIsSearchActive(!isSearchActive); 
    if (isSearchActive) {
      setSearchValue(""); 
      setSearchParams({});
    }
  };

  return (
    <div className="header-icons d-flex justify-content-between align-items-center row">
      {isSearchActive ? (
        <div className="search-bar d-flex align-items-center position-relative col-md-10">
          <input
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={handleSearchInputChange}
            style={{
              padding: "8px 30px 8px 8px", 
              borderRadius: "4px",
              border: "1px solid #ccc",
              width: "100%",
            }}
          />
          <button
            onClick={handleSearchToggle}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              position: "absolute",
              right: "15px",
              fontSize: "10px",
            }}
          >
            <AiOutlineClose />
          </button>
        </div>
      ) : (
        <>
          <div className="col-md-2"></div>
          <Link to={"/user"} className="col-md-2">
            <AiOutlineUser />
          </Link>
          <div className="col-md-2">
            <button
              onClick={handleSearchToggle}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              <AiOutlineSearch />
            </button>
          </div>
          {/* <Link to={"/favorite"} className="col-md-2">
            <AiOutlineHeart />
          </Link> */}
          <div className="col-md-2">
            <CartIcon />
          </div>
        </>
      )}
    </div>
  );
};

export default HeaderIcons;