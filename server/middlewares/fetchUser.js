const jwt = require('jsonwebtoken');

require('dotenv').config();

const jwt_secret = process.env.JWT_SECRET;

const fetchUser = (req, res, next) => {
    const authHeader = req.header('authToken');

    if (!authHeader) {
        res.status(401).json({ msg: 'Not authenticated' });
    }

    try {
        const data = jwt.verify(authHeader, jwt_secret);
        req.user = data;
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Some error occured' });
    }
}


module.exports = fetchUser;