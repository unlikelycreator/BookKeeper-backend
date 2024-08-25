// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET || 'mongodb'; // Use an environment variable for this

const authMiddleware = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; 
    console.log(token)
    if (!token) return res.status(401).json({ error: 'No token provided' });

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = { _id: decoded.userId }; // Attach userId to request object
        next();
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = authMiddleware;
