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
    <div className="header-nav me-auto d-flex justify-content-between">
      <Link to="/" style={getLinkStyle("/")}>
        Home
      </Link>
      <Link to="/shop" style={getLinkStyle("/shop")}>
        Shop
      </Link>
      <Link to="/about" style={getLinkStyle("/about")}>
        About
      </Link>
      <Link to="/contact" style={getLinkStyle("/contact")}>
        Contact
      </Link>
    </div>
  );
};

export default HeaderNav;
