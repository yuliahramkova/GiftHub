const bcrypt = require('bcryptjs');
const db = require('../data/memoryDb');

const DEMO_ACCOUNTS = [
  { email: 'm2408814@misis.edu.ru', password: 'julia123' },
  { email: 'veter228@mail.ru', password: 'dasha123' },
];

function seedDemoPasswords() {
  DEMO_ACCOUNTS.forEach(({ email, password }) => {
    const user = db.users.find((u) => u.email === email);
    if (user) {
      user.passwordHash = bcrypt.hashSync(password, 10);
    }
  });

  db.admin.passwordHash = bcrypt.hashSync('admin123', 10);
}

module.exports = { seedDemoPasswords };
