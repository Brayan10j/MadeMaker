const router = require('express').Router();
const passport = require('passport');
const userCtrl = require('../controller/users.controller');


//ROUTERS

router.get('/users/signup', userCtrl.singUp);

// route para crear el boceto del mueble
router.get('/users/project', (req, res) => {
  res.render('users/project');
});

//
router.post('/users/signup', userCtrl.registrerUser);

//
router.get('/users/signin', (req, res) => {
  res.render('users/signin');
});

//
router.post('/users/signin', passport.authenticate('local', {
  successRedirect: '/projects',
  failureRedirect: '/users/signin',
  failureFlash: true
}));

//
router.get('/users/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out now.');
  res.redirect('/');
});

module.exports = router;
