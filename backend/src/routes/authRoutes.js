const express = require('express');
const passport = require('passport');
const authController = require('../controllers/authController');    

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err) {
            console.error("Authentication error:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
        if (!user) {
            console.log("Authentication failed:", info.message);
            return res.status(401).json({ message: info.message || "Unauthorized" });
        }
        // Nếu xác thực thành công, gọi controller xử lý tiếp
        req.user = user;
        console.log("Authentication successful:", req.user);
        authController.login(req, res);
    })(req, res, next);
});

router.get('/protected', passport.authenticate('jwt', { session: false }), authController.protected);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { session: false }), authController.loginWithGoogle);

module.exports = router;