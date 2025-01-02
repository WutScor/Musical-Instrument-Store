const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('../models/userModel');

module.exports = new LocalStrategy(
    {
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
    async (req, username, password, done) => {
        try {
            const user = await UserModel.getUserByUsername(username);
            console.log("User found:", user);
            if (!user) {
                console.log("User not found");
                return done(null, false, { message: 'User not found' });
            }

            const isMatch = await UserModel.comparePassword(password, user.password);

            if (!isMatch) {
                return done(null, false, { message: 'Incorrect password' });
            }

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
);