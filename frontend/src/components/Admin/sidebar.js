import React from 'react';
import { List, ListItem, Divider } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineDashboard, AiOutlineShoppingCart, AiOutlineAppstore, AiOutlineUser, AiOutlineLogout } from 'react-icons/ai';

const Sidebar = () => {
  const location = useLocation();

  const menuOptions = [
    { name: 'Dashboard', icon: <AiOutlineDashboard size={24} />, value: 'dashboard', path: '/admin/dashboard' },
    { name: 'Products', icon: <AiOutlineShoppingCart size={24} />, value: 'products', path: '/admin/products' },
    { name: 'Categories', icon: <AiOutlineAppstore size={24} />, value: 'category', path: '/admin/categories' },
    { name: 'Account', icon: <AiOutlineUser size={24} />, value: 'account', path: '/admin/accounts' },
    { name: 'Logout', icon: <AiOutlineLogout size={24} />, value: 'logout', path: '/auth/signin' },
  ];

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
            <Link
              to={option.path}
              style={{
                display: 'flex', // Đảm bảo Icon và Text trên cùng một hàng
                alignItems: 'center',
                textDecoration: 'none',
                width: '100%',
                color: location.pathname === option.path ? '#000' : '#797979',
              }}
            >
              <div style={{ marginRight: '16px'}}>{option.icon}</div>
              <span style={{ fontSize: '16px', fontWeight: '500'}}>{option.name}</span>
            </Link>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Sidebar;
