const ordersController = require('../controllers/ordersController');
const router = require('express').Router();
const passport = require('passport');

router.get('/', 
    passport.authenticate('jwt', { session: false }),
    ordersController.getOrders
);

module.exports = router;
