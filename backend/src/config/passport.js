const passport = require('passport');
const localStrat = require('../strategies/localStrat');
const jwtStrat = require('../strategies/jwtStrat');
const googleStrat = require('../strategies/googleStrat');

passport.use('local', localStrat);
passport.use('jwt', jwtStrat);
passport.use('google', googleStrat);

module.exports = passport;