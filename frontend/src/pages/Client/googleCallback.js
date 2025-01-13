import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';

const GoogleCallback = () => {
  const navigate = useNavigate();
  const { fetchUserData, setToken, user } = useContext(AuthContext);

  const createPaymentAccount = async (userId) => {
    try {
        const response = await fetch("/users/payment_account", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId,
            }),
        });
    
        const data = await response.json();

        if (response.ok) {
            navigate("/");
        } else {
            console.error(data.message || 'Payment account creation failed');
        }
    } catch (error) {
        console.error("Error registering user:", error);
    }
  };

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
          console.log("User data:", user);
          window.history.replaceState({}, document.title, "/"); // Xóa query parameters
          if (user) {
            console.log("User logged in with Google:", user);
            await createPaymentAccount(user.id);
          }
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
  }, [navigate, fetchUserData, setToken, user]);

  return <div>Loading...</div>;
};

export default GoogleCallback;
