const bcrypt = require('bcryptjs');
const { users, admin } = require('../data/memoryDb');

const sessions = new Map();

class AuthService {
  async login(email, password) {
    const normalizedEmail = email.trim().toLowerCase();
    const plainPassword = String(password || '').trim();

    if (normalizedEmail === admin.email) {
      const isValid = await bcrypt.compare(plainPassword, admin.passwordHash);
      if (isValid) {
        const sessionToken = `admin_${Date.now()}_${Math.random().toString(36).substr(2, 16)}`;
        sessions.set(sessionToken, { userId: admin.id, role: 'admin' });
        return {
          success: true,
          user: { id: admin.id, name: admin.name, email: admin.email, role: 'admin' },
          sessionToken,
        };
      }
      return { success: false, error: 'Неверный email или пароль' };
    }

    const user = users.find((u) => u.email === normalizedEmail);
    if (!user) {
      return { success: false, error: 'Неверный email или пароль' };
    }

    const isValid = await bcrypt.compare(plainPassword, user.passwordHash);
    if (!isValid) {
      return { success: false, error: 'Неверный email или пароль' };
    }

    const sessionToken = `user_${user.id}_${Date.now()}_${Math.random().toString(36).substr(2, 16)}`;
    sessions.set(sessionToken, { userId: user.id, role: 'user' });

    return {
      success: true,
      user: { id: user.id, name: user.name, email: user.email, role: 'user' },
      sessionToken,
    };
  }

  async register(name, email, age, password) {
    const db = require('../data/memoryDb');
    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = db.users.find((u) => u.email === normalizedEmail);
    if (existingUser) {
      return { success: false, error: 'Пользователь с таким email уже существует' };
    }

    const passwordHash = await bcrypt.hash(String(password).trim(), 10);
    const newId = db.nextUserId;

    const newUser = {
      id: newId,
      name: name.trim(),
      email: normalizedEmail,
      age: age ? Number(age) : undefined,
      passwordHash,
      gifts: [],
    };

    db.users.push(newUser);
    db.nextUserId = newId + 1;

    const sessionToken = `user_${newId}_${Date.now()}_${Math.random().toString(36).substr(2, 16)}`;
    sessions.set(sessionToken, { userId: newId, role: 'user' });

    return {
      success: true,
      user: { id: newUser.id, name: newUser.name, email: newUser.email, role: 'user' },
      sessionToken,
    };
  }

  logout(sessionToken) {
    sessions.delete(sessionToken);
    return { success: true };
  }

  getSession(sessionToken) {
    if (!sessionToken) return null;
    return sessions.get(sessionToken) || null;
  }

  verifySession(sessionToken) {
    const session = this.getSession(sessionToken);
    if (!session) return null;

    if (session.role === 'admin') {
      return {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: 'admin',
      };
    }

    const user = users.find((u) => u.id === session.userId);
    if (!user) return null;

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: 'user',
    };
  }

  isOwner(sessionToken, userId) {
    const session = this.getSession(sessionToken);
    if (!session || session.role !== 'user') return false;
    return session.userId === parseInt(userId, 10);
  }

  isAdmin(sessionToken) {
    const session = this.getSession(sessionToken);
    return Boolean(session && session.role === 'admin');
  }
}

const authService = new AuthService();
authService.sessions = sessions;

module.exports = authService;
