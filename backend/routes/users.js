const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const { validateUser, validateGift } = require('../middleware/validation');
const { checkOwnership, checkAdmin } = require('../middleware/auth');

// Публичные маршруты (по ТЗ)
router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getUserById);

// Защищенные маршруты
router.post('/', validateUser, usersController.createUser);
router.delete('/:id', checkAdmin, usersController.deleteUser);

// Маршруты для подарков (только владелец или админ)
router.get('/:userId/gifts', usersController.getUserGifts);
router.post('/:userId/gifts', validateGift, checkOwnership, usersController.addGift);
router.put('/:userId/gifts/:giftId', validateGift, checkOwnership, usersController.updateGift);
router.delete('/:userId/gifts/:giftId', checkOwnership, usersController.deleteGift);

module.exports = router;