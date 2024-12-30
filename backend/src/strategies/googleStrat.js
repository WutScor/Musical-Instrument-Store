const GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            const user = {
                id: profile.id,
                username: profile.displayName,
                isadmin: false,
            };

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
);