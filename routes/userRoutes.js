const express = require('express');
const { registerUser, authUser, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.get('/:id', protect, getUserById);  // Protected route
router.put('/:id', protect, updateUser);   // Protected route
router.delete('/:id', protect, deleteUser); // Protected route

module.exports = router;
