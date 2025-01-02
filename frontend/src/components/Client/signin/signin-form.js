import { useContext, useState } from "react";
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../../context/authContext";
import { jwtDecode } from "jwt-decode";


const SignInForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const context = useContext(AuthContext);

    const handleToggle = () => {
        if (type === 'password') {
            setIcon(eye);
            setType('text');
        } else {
            setIcon(eyeOff);
            setType('password');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });
            const textResponse = await response.text();
            console.log("Response:", textResponse);
            
            let data;
            try {
                data = JSON.parse(textResponse);
                console.log("Data:", data);
            } catch (err) {
                console.error("Error parsing JSON:", err);
                setError("An error occurred while processing your request");
                return;
            }
            
            if (!response.ok) setError(data.message || "Invalid login credentials.");
            else {
                localStorage.setItem("token", data.token);
                context.setToken(data.token);
                const decodedToken = jwtDecode(data.token);
                console.log("User's role:", decodedToken.role);
                if (decodedToken.role === "admin") navigate("/admin/dashboard");
                else navigate("/");
            }
        } catch (err) {
            console.error("Error:", err);
            setError("An error occurred while processing your request");
        }
    };

    return (
        <>
            <div className="signin-form container mt-5">
                <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: "500px" }}>
                    <div className="row mb-3">
                        <div className="col d-flex align-items-center">
                            <AiOutlineUser className="me-2" />
                            <label className="mb-0">Username</label>
                        </div>
                        <div className="col">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col d-flex align-items-center">
                            <AiOutlineLock className="me-2" />
                            <label className="mb-0">Password</label>
                        </div>
                        <div className="col position-relative">
                            <input
                                type={type}
                                className="form-control"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                            />
                            <span
                                onClick={handleToggle}
                                style={{ cursor: "pointer" }}
                                className="position-absolute top-50 end-0 translate-middle-y pe-3">
                                <Icon icon={icon} size={20} />
                            </span>
                        </div>
                    </div>
                    {error && (
                        <div className="alert alert-danger text-center mx-auto mt-3" role="alert">
                            {error}
                        </div>
                    )}
                    <div className="text-center">
                        <button type="submit" className="btn mt-3">
                            Sign In
                        </button>
                    </div>
                    {/* Google Login Button */}
                    <div className="text-center mt-3">
                        <a href="https://localhost:4000/auth/google" className="btn btn-outline-danger">
                            <FaGoogle className="me-2" />
                            Sign In with Google
                        </a>
                    </div>
                </form>
            </div>
        </>
    );
};


export default SignInForm;
