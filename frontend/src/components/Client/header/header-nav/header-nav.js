import { Link, useLocation } from "react-router-dom";

const HeaderNav = () => {
  const location = useLocation(); // Lấy thông tin về URL hiện tại

  // Hàm kiểm tra xem trang hiện tại có khớp với đường dẫn hay không
  const getLinkStyle = (path) => {
    return location.pathname === path
      ? { backgroundColor: '#FFD2A5', borderRadius: '45px', padding: '5px 15px' }  // Áp dụng style khi trang khớp
      : {padding: '5px 10px'};
  };

  return (
    <div className="header-nav row">
      <div className="col-md-3">
        <Link to="/" style={getLinkStyle("/")}>
          Home
        </Link>
      </div>
      <div className="col-md-3">
        <Link to="/shop" style={getLinkStyle("/shop")}>
          Shop
        </Link>
      </div>
      <div className="col-md-3">
        <Link to="/about" style={getLinkStyle("/about")}>
          About
        </Link>
      </div>
      <div className="col-md-3">
        <Link to="/contact" style={getLinkStyle("/contact")}>
          Contact
        </Link>
      </div>
    </div>
  );
};

export default HeaderNav;
