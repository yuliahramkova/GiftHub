const userService = require('../services/userService');
const giftService = require('../services/giftService');

const getAllUsers = (req, res) => {
  try {
    const users = userService.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

const getUserById = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const user = userService.getUserById(id);
    
    if (!user) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }
    
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

const createUser = (req, res) => {
  try {
    const { name, email, age } = req.body;
    
    const existingUser = userService.getAllUsers().find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ error: 'Пользователь с таким email уже существует' });
    }
    
    const result = userService.createUser({ name, email, age });
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка при создании пользователя' });
  }
};

const deleteUser = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const deleted = userService.deleteUser(id);
    
    if (!deleted) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }
    
    res.json({ message: 'Пользователь удален' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

const getUserGifts = (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const gifts = giftService.getUserGifts(userId);
    
    if (!gifts) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }
    
    res.json(gifts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

const addGift = (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const gift = giftService.addGift(userId, req.body);
    
    if (!gift) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }
    
    res.status(201).json(gift);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка при добавлении подарка' });
  }
};

const updateGift = (req, res) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const giftId = parseInt(req.params.giftId, 10);
    const gift = giftService.updateGift(userId, giftId, req.body);

    if (!gift) {
      return res.status(404).json({ error: 'Подарок не найден' });
    }

    res.json(gift);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка при обновлении подарка' });
  }
};

const deleteGift = (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const giftId = parseInt(req.params.giftId);
    
    const deleted = giftService.deleteGift(userId, giftId);
    
    if (!deleted) {
      return res.status(404).json({ error: 'Подарок не найден' });
    }
    
    res.json({ message: 'Подарок удален' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  getUserGifts,
  addGift,
  updateGift,
  deleteGift
};