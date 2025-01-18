const authController = require('../controller/auth');
const userController = require('../controller/user');

const router = require('express').Router();

require('express-group-routes');

router.group('/auth', route => {
  route.post('/login', authController.login);
  route.post('/verify', authController.verify);
});

router.group('/user', route => {
  route.get('/contacts', userController.getContacts);
  route.get('/messages/:contactId', userController.getMessages);

  route.post('/send-otp', userController.sendOtp);
  route.post('/message', userController.createMessage);
  route.post('/message-read', userController.messageRead);
  route.post('/contact', userController.createContact);
  route.post('/reaction', userController.createReaction);

  route.put('/profile', userController.updateProfile);
  route.put('/email', userController.updateEmail);
  route.put('/message/:messageId', userController.updateMessage);

  route.delete('/', userController.deleteUser);
  route.delete('/message/:messageId', userController.deleteMessage);
});

module.exports = router;
