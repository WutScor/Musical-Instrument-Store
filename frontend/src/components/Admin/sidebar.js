import React, { useContext } from 'react';
import { List, ListItem, Divider } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineDashboard, AiOutlineShoppingCart, AiOutlineAppstore, AiOutlineUser, AiOutlineLogout } from 'react-icons/ai';
import { AuthContext } from '../../context/authContext';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext); // Truy cập hàm logout từ AuthContext

  const menuOptions = [
    { name: 'Dashboard', icon: <AiOutlineDashboard size={24} />, value: 'dashboard', path: '/admin/dashboard' },
    { name: 'Products', icon: <AiOutlineShoppingCart size={24} />, value: 'products', path: '/admin/products' },
    { name: 'Categories', icon: <AiOutlineAppstore size={24} />, value: 'category', path: '/admin/categories' },
    { name: 'Account', icon: <AiOutlineUser size={24} />, value: 'account', path: '/admin/accounts' },
    { name: 'Logout', icon: <AiOutlineLogout size={24} />, value: 'logout', path: '/' },
  ];

  const handleItemClick = (option) => {
    if (option.value === 'logout') {
      logout(); // Gọi hàm logout
      navigate(option.path); // Chuyển hướng đến '/'
    } else {
      navigate(option.path); // Chuyển hướng đến path của option
    }
  };

  return (
    <div style={{ height: '100%', backgroundColor: '#FFE6CD', padding: '16px' }}>
      <div className="logo me-auto">
        <h3 className="fw-bold">Sickalinz</h3>
      </div>
      <Divider sx={{ my: 2 }} />
      <List>
        {menuOptions.map((option) => (
          <ListItem
            key={option.value}
            onClick={() => handleItemClick(option)} // Gọi hàm xử lý click
            sx={{
              backgroundColor: location.pathname === option.path ? '#FFD2A5' : 'transparent',
              borderRadius: '8px', // Bo góc luôn có, kể cả hover
              transition: 'transform 0.2s, background-color 0.2s', // Hiệu ứng mượt
              '&:hover': {
                backgroundColor: '#FFF2E5',
                transform: 'scale(1.05)', // Phóng to khi hover
              },
              padding: '20px 16px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                width: '100%',
                color: location.pathname === option.path ? '#000' : '#797979',
                cursor: 'pointer',
              }}
            >
              <div style={{ marginRight: '16px' }}>{option.icon}</div>
              <span style={{ fontSize: '16px', fontWeight: '500' }}>{option.name}</span>
            </div>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Sidebar;
