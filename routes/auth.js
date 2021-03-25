const express = require('express');
const router = express.Router();


// Controller callback functions
const { SIGNUP, LOGIN, CURRENT_USER, VerifyJWT } = require('../controllers/auth');

// CRUD and middleware
router.post('/signup', SIGNUP);
router.post('/login', LOGIN);
router.get('/user', VerifyJWT, CURRENT_USER);
router.get('/verify', VerifyJWT);


module.exports = router;
