const router = require('express').Router();
const authController = require('./controller');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({ usernameField: 'us_email', passwordField: 'us_password' }, authController.localStrategy));
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/show', authController.index);
router.get('/addUser_Collection', authController.addUser);

module.exports = router;