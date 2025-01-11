import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';

const GoogleCallback = () => {
  const navigate = useNavigate();
  const { fetchUserData, setToken } = useContext(AuthContext);

  useEffect(() => {
    const handleGoogleCallback = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        console.log("Google token:", token);

        if (token) {
          console.log("Saving token to localStorage:", token);
          localStorage.setItem('token', token);
          setToken(token); // Cập nhật token trong AuthContext
          await fetchUserData(); // Lấy thông tin user ngay lập tức
          window.history.replaceState({}, document.title, "/"); // Xóa query parameters
          navigate('/'); 
        } else {
          console.log("No token found, redirecting to login page");
          navigate('/auth/signin');
        }
      } catch (error) {
        console.error("Error during Google login callback", error);
        navigate('/auth/signin');
      }
    };

    handleGoogleCallback();
  }, [navigate, fetchUserData, setToken]);

  return <div>Loading...</div>;
};

export default GoogleCallback;
