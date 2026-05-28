const db = require('../data/memoryDb');

class GiftService {
  getUserGifts(userId) {
    const user = db.users.find(u => u.id === userId);
    if (!user) return null;
    return user.gifts;
  }
  
  addGift(userId, giftData) {
    const user = db.users.find(u => u.id === userId);
    if (!user) return null;
    
    const { title, imageUrl, description, price, link } = giftData;
    
    const newGiftId = db.nextGiftId;
    
    const newGift = {
      id: newGiftId,
      title: title.trim(),
      imageUrl: imageUrl || 'https://via.placeholder.com/300x200?text=No+Image',
      description: description || '',
      price: price ? Number(price) : null,
      link: link || '',
      status: 'free',
      reservedBy: null
    };
    
    user.gifts.push(newGift);
    
    // Увеличиваем счетчик подарков
    db.nextGiftId = newGiftId + 1;
    
    return newGift;
  }
  
  reserveGift(giftId, guestId) {
    for (const user of db.users) {
      const gift = user.gifts.find(g => g.id === giftId);
      if (gift) {
        if (gift.status === 'reserved') {
          return { success: false, error: 'Подарок уже забронирован' };
        }
        
        gift.status = 'reserved';
        gift.reservedBy = guestId;
        return { success: true, gift };
      }
    }
    return { success: false, error: 'Подарок не найден' };
  }
  
  cancelReserve(giftId, guestId) {
    for (const user of db.users) {
      const gift = user.gifts.find(g => g.id === giftId);
      if (gift) {
        if (gift.status === 'reserved' && gift.reservedBy === guestId) {
          gift.status = 'free';
          gift.reservedBy = null;
          return { success: true, gift };
        }
        return { success: false, error: 'Нельзя отменить бронь другого пользователя' };
      }
    }
    return { success: false, error: 'Подарок не найден' };
  }
  
  updateGift(userId, giftId, giftData) {
    const user = db.users.find(u => u.id === userId);
    if (!user) return null;

    const gift = user.gifts.find(g => g.id === giftId);
    if (!gift) return null;

    if (giftData.title !== undefined) gift.title = giftData.title.trim();
    if (giftData.imageUrl !== undefined) gift.imageUrl = giftData.imageUrl || gift.imageUrl;
    if (giftData.description !== undefined) gift.description = giftData.description || '';
    if (giftData.price !== undefined) gift.price = giftData.price ? Number(giftData.price) : null;
    if (giftData.link !== undefined) gift.link = giftData.link || '';

    return gift;
  }

  deleteGift(userId, giftId) {
    const user = db.users.find(u => u.id === userId);
    if (!user) return false;
    
    const giftIndex = user.gifts.findIndex(g => g.id === giftId);
    if (giftIndex === -1) return false;
    
    user.gifts.splice(giftIndex, 1);
    return true;
  }
}

module.exports = new GiftService();