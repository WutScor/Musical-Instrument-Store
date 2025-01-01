const GoogleStrategy = require('passport-google-oauth20').Strategy;
const userModel = require('../models/userModel');

module.exports = new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            // const user = {
            //     id: profile.id,
            //     username: profile.displayName,
            //     isadmin: false,
            // };

            const email = profile.emails[0].value;
            const displayName = profile.displayName;

            let user = await userModel.getUserByEmail(email);

            if (!user) {
                user = await userModel.createUser({ username: displayName, email, password: "", isadmin: false });
            }

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
);