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
    console.log("logging in user", req.user);
    try {
        const token = jwt.sign({ sub: req.user.id, role: user.isAdmin ? "admin" : "client" }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ message: "Login successful", token });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: "Error logging in" });
    }
};

exports.protected = async (req, res) => {
    try {
        const user = req.user;
        console.log("protected data", user);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        const fullUser = await userModel.getUserById(user.id);

        if (!fullUser) {
            return res.status(404).json({ message: "User not found in database" });
        }

        res.status(200).json({ user: fullUser });
    } catch (error) {
        console.error("Error getting protected data:", error);
        res.status(500).json({ message: "Error getting protected data" });
    }
};  


exports.loginWithGoogle = async (req, res) => {
    console.log("logging in with Google", req.user);
    try {
        const token = jwt.sign({ sub: req.user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        console.log('redirecting to client with token', token);
        res.redirect(`http://localhost:3000/auth/google/callback?token=${token}`);
    } catch (error) {
        console.error("Error logging in with Google:", error);
        res.status(500).json({ message: "Error logging in with Google" });
    }
};


exports.requireRole = (role) => {
    return (req, res, next) => {
        if (!req.user || req.user.role !== role) {
            return res.status(403).json({ message: "Forbidden: Insufficient privileges" });
        }
        next();
    };
};

exports.admin = async (req, res) => {
    try {
        res.json({ message: "Admin data" });
    } catch (error) {
        console.error("Error getting admin data:", error);
        res.status(500).json({ message: "Error getting admin data" });
    }
};