import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GoogleCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const getGoogleToken = async () => {
      try {
        // Lấy mã thông báo từ URL (dùng thư viện như URLSearchParams để lấy token)
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        
        if (token) {
          // Lưu token vào localStorage
          localStorage.setItem('token', token);
          navigate('/');  // Điều hướng về trang chủ
        } else {
          // Nếu không có token, điều hướng về trang đăng nhập hoặc hiển thị lỗi
          navigate('/');
        }
      } catch (error) {
        console.error("Error during Google login callback", error);
        navigate('/login');
      }
    };

    getGoogleToken();
  }, [navigate]);

  return <div>Loading...</div>;  // Hiển thị thông báo loading trong khi xử lý
};

export default GoogleCallback;
