const { Router } = require('express');
const authController = require('../controllers/authControllers');


const router = Router();


router.get('/', (req, res) => res.redirect('/login'));
router.get('/signup', authController.signup_get);
router.post('/signup', authController.signup_post);
router.get('/signup/user', authController.signup_user.get);
router.post('/signup/user', authController.signup_user.post);
router.get('/login', authController.login_get);
router.post('/login', authController.login_post);
router.get('/logout', authController.logout_get);


module.exports = router;