const Users = require('../models/user.model');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const jwt_secret = process.env.JWT_SECRET;

// Controller for user signup
const signupController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        // Check if user already exists
        if (await (Users.findOne({ email: req.body.email }))) {
            return res.status(422).json({ errors: [{ msg: 'User already exists' }] });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Create new user
        const user = new Users({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });

        // Generate JWT token
        const authToken = jwt.sign(user.id, jwt_secret);

        res.send(authToken);

        // Save user
        user.save().catch(err => console.log(err));

    } catch (e) {
        console.log(e);
        res.status(500).send("Some error has occurred");
    }
}

// Controller for user signin
const signinController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // Find user by email
        let user = await Users.findOne({ email });
        if (!user) {
            return res.status(422).json({ errors: [{ msg: 'Invalid Credentials' }] });
        }

        // Check password
        if (!await bcrypt.compare(password, user.password)) {
            return res.status(422).json({ errors: [{ msg: 'Invalid Credentials' }] });
        }


        // Generate JWT token
        const authToken = jwt.sign(user.id, jwt_secret);
        user.lastLogin = new Date();
        await user.save();
        res.send(authToken);

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}

const getUser = async (req, res) => {
    try {
        const userId = req.user;
        const user = await Users.findById(userId).select('-password',);
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    signupController,
    signinController,
    getUser
};