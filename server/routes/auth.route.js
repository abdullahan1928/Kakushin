const express = require("express");
const router = express.Router();
const { body } = require('express-validator');
const { signupController, signinController, getUser } = require("../controllers/auth.controller");
const fetchUser = require("../middlewares/fetchUser");

router.post('/signup', [
    body('email').not().isEmpty().withMessage('Email is required').isEmail(),
    body('password').not().isEmpty().withMessage('Password is required').isLength({ min: 5 }),
], signupController);

router.post('/login', [
    body('email').not().isEmpty().withMessage('Email is required').isEmail(),
    body('password').not().isEmpty().withMessage('Password is required').isLength({ min: 5 })
], signinController);

router.get('/user', fetchUser, getUser);

module.exports = router; 
