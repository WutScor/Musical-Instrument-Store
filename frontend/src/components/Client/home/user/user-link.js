import { useNavigate } from "react-router-dom";


const UserLink = ({ direction, imgUrl }) => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${direction}`);
  };

  return (
    <div className="user-link" onClick={handleClick}>
        <img src={imgUrl} alt="user-link" className="w-100" />
        <div className="user-link-overlay position-absolute w-100 h-100 d-flex justify-content-center align-items-center">
            <h3 className="text-white">My {direction}</h3>
        </div>
    </div>
  );
};

export default UserLink;