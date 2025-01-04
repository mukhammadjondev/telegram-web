const authController = require('../controller/auth');

const router = require('express').Router();

require('express-group-routes');

router.group('/auth', route => {
  route.post('/login', authController.login);
  route.post('/verify', authController.verify);
});

router.group('/user', route => {
  route.get('/contacts', (req, res) => {
    res.send({ contacts: [] });
  });
});

module.exports = router;
