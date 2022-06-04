const express = require('express');

const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');
const bookingController = require('../controllers/bookingController');


const router = express.Router();

router.get('/overview', authController.isLoggedIn, (req, res) => {
  res.status(200).render('homePage');
});

router.get('/', authController.isLoggedIn, viewsController.getOverview);


router.get('/tour/:slug', authController.isLoggedIn, viewsController.getTour);
router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
router.get('/me', authController.protect, viewsController.getAccount);
router.get('/signup',viewsController.getSignupForm);
router.get('/forgetPassword',viewsController.getPasswordForget);


// router.post('/forgotPassword', authController.forgotPassword);
router.post('/forgotPassword', authController.forgotPassword, viewsController.getPasswordForget);
router.patch('/resetPassword/:token', authController.resetPassword);


router.get(
  '/my-tours',
  bookingController.createBookingCheckout,
  authController.protect,
  viewsController.getMyTours
);

router.get('/manage-bookings', authController.protect, viewsController.getAdminAccount);

router.get('/manage-tours', authController.protect, viewsController.getAdminAccount);

router.get('/manage-users', authController.protect, viewsController.getAdminAccount);

router.get('/billing', authController.protect, viewsController.getAccount);


router.post(
  '/submit-user-data',
  authController.protect,
  viewsController.updateUserData
);

module.exports = router;