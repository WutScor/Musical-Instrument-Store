const { ExtractJwt } = require('passport-jwt');
const { Strategy } = require('passport-local');
const UserModel = require('../models/userModel');   

module.exports = new Strategy(
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET || '123456'
    },
    async (payload, done) => {
        try {
            const user = await UserModel.getUserById(payload.sub);

            if (!user) {
                return done(null, false, { message: 'User not found' });
            }

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
);