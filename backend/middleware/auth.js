const authService = require('../services/authService');

function checkOwnership(req, res, next) {
  const userId = parseInt(req.params.userId, 10);
  const sessionToken = req.headers['x-session-token'];

  if (!sessionToken) {
    return res.status(403).json({ error: 'Нет прав для редактирования подарков' });
  }

  const session = authService.getSession(sessionToken);
  if (!session) {
    return res.status(401).json({ error: 'Сессия недействительна. Войдите снова.' });
  }

  if (session.role === 'user' && session.userId === userId) {
    return next();
  }

  return res.status(403).json({ error: 'Нет прав для редактирования подарков' });
}

function checkGiftOwner(req, res, next) {
  req.params.userId = req.params.userId || req.params.id;
  return checkOwnership(req, res, next);
}

function checkAdmin(req, res, next) {
  const sessionToken = req.headers['x-session-token'];

  if (sessionToken && authService.isAdmin(sessionToken)) {
    return next();
  }

  return res.status(403).json({ error: 'Требуются права администратора' });
}

module.exports = { checkGiftOwner, checkAdmin, checkOwnership };
