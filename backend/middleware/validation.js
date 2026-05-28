const validator = require('validator');

// Валидация пользователя при создании
function validateUser(req, res, next) {
  const { name, email, age } = req.body;
  
  // Проверка обязательного поля name
  if (!name || name.trim() === '') {
    return res.status(400).json({ error: 'Имя обязательно для заполнения' });
  }
  
  // Проверка email через библиотеку validator
  if (!email || !validator.isEmail(email)) {
    return res.status(400).json({ error: 'Введите корректный email адрес' });
  }
  
  // Проверка age (опционально, но если есть - должно быть числом)
  if (age !== undefined && age !== '') {
    const ageNum = Number(age);
    if (isNaN(ageNum) || ageNum < 0 || ageNum > 150) {
      return res.status(400).json({ error: 'Возраст должен быть числом от 0 до 150' });
    }
  }
  
  next();
}

// Валидация подарка
function validateGift(req, res, next) {
  const { title, imageUrl, description, price, link } = req.body;
  
  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Название подарка обязательно' });
  }
  
  if (price !== undefined && price !== '') {
    const priceNum = Number(price);
    if (isNaN(priceNum) || priceNum < 0) {
      return res.status(400).json({ error: 'Цена должна быть положительным числом' });
    }
  }
  
  next();
}

module.exports = { validateUser, validateGift };