const express = require('express');

const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');


const router = express.Router();



router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

//  passwords
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);



//  middlewares executes in sequence so we added use and then run all
// Protect all routes after this middleware
router.use(authController.protect);

// update user 
router.patch('/updateMyPassword', authController.updatePassword);
router.get('/me', userController.getMe, userController.getUser);
router.get('/my-tours', userController.getMe, userController.getUser);
router.get('/billing', userController.getMe, userController.getUser);
router.patch('/updateMe', userController.uploadUserPhoto,
userController.resizeUserPhoto,userController.updateMe);
//  delete user
router.delete('/deleteMe', userController.deleteMe);

//  another middleware and that apply to all below routes
router.use(authController.restrictTo('admin'));

// only admin can use all these  routes
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
