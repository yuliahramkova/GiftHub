// Импортируем ссылку на объект БД
const db = require('../data/memoryDb');

class UserService {
  // Получить всех пользователей
  getAllUsers() {
    return db.users.map(({ id, name, email, age, gifts }) => ({
      id,
      name,
      email,
      age,
      giftCount: gifts ? gifts.length : 0
    }));
  }
  
  // Получить пользователя по ID
  getUserById(id) {
    const user = db.users.find(u => u.id === id);
    if (!user) return null;
    
    const { editToken, ...userWithoutToken } = user;
    return userWithoutToken;
  }
  
  // Создать нового пользователя
  createUser(userData) {
    const { name, email, age } = userData;
    
    // Берем текущий ID и увеличиваем
    const newId = db.nextUserId;
    const editToken = `edit_token_${newId}_${Date.now()}`;
    
    const newUser = {
      id: newId,
      name: name.trim(),
      email: email.toLowerCase(),
      age: age ? Number(age) : undefined,
      editToken: editToken,
      gifts: []
    };
    
    db.users.push(newUser);
    
    // Увеличиваем счетчик для следующего пользователя
    db.nextUserId = newId + 1;
    
    // Возвращаем пользователя без токена (токен отдельно)
    const { editToken: _, ...userWithoutToken } = newUser;
    return { user: userWithoutToken, editToken };
  }
  
  // Удалить пользователя
  deleteUser(id) {
    const index = db.users.findIndex(u => u.id === id);
    if (index === -1) return false;
    
    db.users.splice(index, 1);
    return true;
  }
}

module.exports = new UserService();