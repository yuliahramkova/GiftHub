const express = require('express');
const router = express.Router();
const authService = require('../services/authService');

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email и пароль обязательны' });
    }
    
    const result = await authService.login(email, password);
    
    if (!result.success) {
      return res.status(401).json({ error: result.error });
    }
    
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { name, email, age, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Имя, email и пароль обязательны' });
    }
    
    const result = await authService.register(name, email, age, password);
    
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }
    
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

router.post('/logout', (req, res) => {
  const sessionToken = req.headers['x-session-token'];
  if (sessionToken) {
    authService.logout(sessionToken);
  }
  res.json({ success: true });
});

router.get('/verify', (req, res) => {
  const sessionToken = req.headers['x-session-token'];
  const user = authService.verifySession(sessionToken);

  if (!user) {
    return res.status(401).json({ error: 'Сессия недействительна' });
  }

  res.json({ success: true, user });
});

module.exports = router;