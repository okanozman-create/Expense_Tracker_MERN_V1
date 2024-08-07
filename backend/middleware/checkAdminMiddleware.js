// middleware/checkAdmin.js
const User = require('../models/User');

const checkAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id); // Use ID from req.user set by authMiddleware

        if (user && user.isAdmin) {
            next();
        } else {
            res.status(403).json({ message: 'Admin privileges required' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = checkAdmin;
