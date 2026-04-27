const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    // This creates a unique "Signature" for each user
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

module.exports = generateToken;