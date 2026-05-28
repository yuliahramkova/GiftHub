const express = require('express');
const cors = require('cors');
const usersRouter = require('./routes/users');
const giftsRouter = require('./routes/gifts');
const authRouter = require('./routes/auth');
const { seedDemoPasswords } = require('./utils/seedPasswords');

seedDemoPasswords();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use('/users', usersRouter);
app.use('/gifts', giftsRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.json({ message: 'GiftHub API работает!' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Маршрут не найден' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Ошибка сервера' });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});