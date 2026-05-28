const express = require('express');
const router = express.Router();
const giftService = require('../services/giftService');

// POST /gifts/:giftId/reserve - забронировать подарок
router.post('/:giftId/reserve', (req, res) => {
  try {
    const giftId = parseInt(req.params.giftId);
    const guestId = req.headers['x-guest-id'];
    
    if (!guestId) {
      return res.status(400).json({ error: 'Идентификатор гостя обязателен' });
    }
    
    const result = giftService.reserveGift(giftId, guestId);
    
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }
    
    res.json(result.gift);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// DELETE /gifts/:giftId/reserve - отменить бронь
router.delete('/:giftId/reserve', (req, res) => {
  try {
    const giftId = parseInt(req.params.giftId);
    const guestId = req.headers['x-guest-id'];
    
    if (!guestId) {
      return res.status(400).json({ error: 'Идентификатор гостя обязателен' });
    }
    
    const result = giftService.cancelReserve(giftId, guestId);
    
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }
    
    res.json(result.gift);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

module.exports = router;