import React, { useState } from "react";
import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { Icon } from "react-icons-kit";
import { eye, eyeOff } from "react-icons-kit/feather";
import { useNavigate } from "react-router-dom";

const PasswordInput = ({ placeholder, value, onChange }) => {
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);

  const handleToggle = () => {
    if (type === "password") {
      setType("text");
      setIcon(eye);
    } else {
      setType("password");
      setIcon(eyeOff);
    }
  };

  return (
    <div className="d-flex flex-row align-items-center p2 w-100 position-relative">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-100"
      />
      <span
        className="d-flex justify-content-around align-items-center position-absolute"
        onClick={handleToggle}
        style={{ cursor: "pointer", right: "10px" }}
      >
        <Icon className="eye" icon={icon} size={25} />
      </span>
    </div>
  );
};

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(password !== password2){
      alert("Password doesn't match");
      return;
    }

    console.log(username + " " + email + " " + password);
    try {
        const response = await fetch("/auth/register", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            username,
            email,
            password,
            }),
        });
    
        const data = await response.json();

        if (response.ok) {
            console.log("User registered:", data);
            navigate("/auth/signin");
        } else {
            setError(data.message || "Registration failed");
        }
    } catch (error) {
        console.error("Error registering user:", error);
        setError("An error occurred processing your request");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="signin-form w-100">
      <div className="row">
        <div className="col-md-4">
            <div className="d-flex flex-row align-items-center p2">
              <AiOutlineUser />
              <p className="form-txt">Username</p>
            </div>
        </div>
          <div className="col-md-8">
            <div className="d-flex flex-row align-items-center p2 w-100">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-100"
              />
            </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4">
          <div className="d-flex flex-row align-items-center p2">
            <AiOutlineMail />
            <p className="form-txt">Email</p>
          </div>
        </div>
        <div className="col-md-8">
            <div className="d-flex flex-row align-items-center p2 w-100">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-100"
              />
            </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4">
            <div className="d-flex flex-row align-items-center p2">
              <AiOutlineLock />
              <p className="form-txt">Password</p>
            </div>
        </div>
        <div className="col-md-8">
            <PasswordInput
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
        </div>
      </div>

      <div className="row">
        <div className="col-md-4">
            <div className="d-flex flex-row align-items-center p2">
              <AiOutlineLock />
              <p className="form-txt">Re-enter Password</p>
            </div>
        </div>
        <div className="col-md-8">
            <PasswordInput
              placeholder="Re-enter Password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
        </div>
      </div>
      {
        error && 
        <div className="alert alert-danger text-center mx-auto mt-3" role="alert">
            {error}
        </div>
      } {/* Hiển thị thông báo lỗi */}
      <div className="d-flex justify-content-center mt-3">
        <button type="submit" className="btn">
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;


            
