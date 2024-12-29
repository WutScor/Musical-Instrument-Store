import React, { useState } from "react";
import SignInForm from "../../components/Client/signin/signin-form";
import { Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const SignInPage = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); 

    const handleSignIn = async () => {
        try {
            console.log("Email:", email);
            console.log("Password:", password);
            console.log(JSON.stringify({
                email, password
            }));
            const response = await fetch('/auth/login', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json', // Quan trọng để server biết là JSON
                },
                body: JSON.stringify({
                email,     // Đảm bảo biến `email` đã có giá trị
                password,  // Đảm bảo biến `password` đã có giá trị
                }),
            });
            const data = await response.json();
            if (response.ok) {
                console.log("Login successful:", data.user);
                alert("Login successful!");

                // Kiểm tra quyền admin
                if (data.user.isadmin) {
                    // Chuyển hướng đến trang admin nếu user là admin
                    navigate("/admin/dashboard"); // Thay thế bằng đường dẫn trang admin của bạn
                } else {
                    // Lưu accessToken vào localStorage cho các API sau
                    localStorage.setItem("accessToken", data.accessToken);
                    alert("Logged in as a regular user");
                }
            } else {
                alert("Login failed: " + data.message);
            }
          // Xử lý logic sau khi đăng nhập thành công, ví dụ lưu token
        } catch (error) {
          console.error("Login failed:", error.response?.data || error.message);
          alert("Login failed! Please check your credentials.");
        }
      };

    return(
        <>
            <div className="main d-flex justify-content-center align-items-center">
                <div className="container-w5">
                    <div className="d-flex align-items-center justify-content-center flex-column textZone mt-5">
                        <h1>THIS IS SIGNIN PAGE</h1>
                        <p className="short-desc">Sign mtfk in u dawg!!</p>

                        <SignInForm setEmail={setEmail} setPassword={setPassword}/>
                        <Button className="mt-5" onClick={handleSignIn}>Sign In</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignInPage;