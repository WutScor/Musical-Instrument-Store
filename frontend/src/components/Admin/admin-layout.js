import { Outlet } from 'react-router-dom';
import Sidebar from './sidebar.js';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext.js';

const AdminLayout = () => {

  const context = useContext(AuthContext);
  console.log("User:", context.user);
  if (!context.user || !context.user.isadmin) {
    return <h1>Access denied</h1>;
  }
  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        overflow: 'hidden', // Ẩn cuộn chung
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: '300px',
          backgroundColor: '#FFE6CD',
          flexShrink: 0, // Sidebar không co lại
          position: 'fixed', // Giữ Sidebar cố định
          top: 0,
          bottom: 0,
          overflow: 'hidden', // Không cuộn
        }}
      >
        <Sidebar />
      </div>

      {/* Content */}
      <div
        style={{
          marginLeft: '300px', // Dịch Content sang phải bằng chiều rộng Sidebar
          flexGrow: 1,
          overflowY: 'auto', // Cho phép Content cuộn dọc
          padding: '16px',
          backgroundColor: '#f5f5f5',
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
