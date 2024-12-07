import { Link, useNavigate } from "react-router-dom";


export default function Navbar() {
    return (
        <nav style={{ padding: '10px', backgroundColor: '#333', color: '#fff' }}>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li style={{ display: 'inline', marginRight: '20px' }}>
              <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>
                Home
              </Link>
            </li>
            <li style={{ display: 'inline' }}>
              <Link to="/about" style={{ color: '#fff', textDecoration: 'none' }}>
                About
              </Link>
            </li>
          </ul>
        </nav>
      );
}