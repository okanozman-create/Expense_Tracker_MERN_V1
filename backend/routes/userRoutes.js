const express = require('express');
const router = express.Router();

const {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} = require('../controllers/userController'); // adjust the path as needed
const authMiddleware = require('../middleware/authMiddleware');
const checkAdminMiddleware = require('../middleware/checkAdminMiddleware')

router.post('/users', authMiddleware, checkAdminMiddleware, createUser);
router.get('/users', authMiddleware, checkAdminMiddleware, getAllUsers);
router.get('/users/:id', authMiddleware, checkAdminMiddleware, getUserById);
router.put('/users/:id', authMiddleware, checkAdminMiddleware, updateUser);
router.delete('/users/:id', authMiddleware, checkAdminMiddleware, deleteUser);

module.exports = router;
