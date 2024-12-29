import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GoogleCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const getGoogleToken = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        console.log("Google token:", token);
        
        if (token) {
          localStorage.setItem('token', token);
          navigate('/'); 
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error("Error during Google login callback", error);
        navigate('/login');
      }
    };

    getGoogleToken();
  }, [navigate]);

  return <div>Loading...</div>;
};

export default GoogleCallback;
