const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { sequelize } = require('./models');

dotenv.config();

const authRoutes = require('./routes/authRoutes');
const volunteerRoutes = require('./routes/volunteerRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/volunteers', volunteerRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Sync Database and Start Server
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected.');
    await sequelize.sync(); // Use { force: true } to reset DB during dev if needed
    console.log('Database synced.');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();
