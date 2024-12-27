const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();


exports.register = async (req, res) => {
    console.log("registering user", req.body);
    try {
        const { username, email, password } = req.body;
        console.log(username + " " + email + " " + password);
    
        if (!username || !email || !password) {
        return res.status(400).json({ message: "Please fill in all fields" });
        }
    
        const user = await userModel.getUserByUsername(username);
    
        if (user) {
        return res.status(400).json({ message: "User already exists" });
        }
    
        const newUser = await userModel.createUser({ username, password });
    
        res.json(newUser);
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Error registering user" });
    }
};

exports.login = async (req, res) => {
    try {
        console.log("Dô AUTH rồi");
        const user = await userModel.getUserByUsername("admin");
        const accessToken = jwt.sign({_id: user.id }, process.env.JWT_SECRET);
        console.log(accessToken);
        user.password = undefined;
        console.log(user);
        res.status(200).json({
            message: "Login successful",
            user: user,
            accessToken 
        });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: "Error logging in" });
    }
};

exports.protected = async (req, res) => {
    res.json({ message: "Protected route", user: req.user });
};  
