const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes'); 
const orderRoutes = require('./routes/orderRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const path = require('path');

dotenv.config();

if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET is required');
  process.exit(1);
}

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// Database Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/playgear_nepal';

mongoose.connect(MONGO_URI)
  .then(() => console.log(' Connected to MongoDB Successfully'))
  .catch((err) => {
    console.error(' MongoDB Connection Error:', err.message);
    process.exit(1); 
  });

// 4. API Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes); 
app.use('/api/orders', orderRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/upload', uploadRoutes);

// Test Route
app.get('/', (req, res) => {
  res.send('Play Gear API is running...');
});

// 404 Handler
app.use((req, res, next) => {
    console.log(`404 Check: You tried to reach ${req.method} ${req.url}`);
    res.status(404).json({ message: `Route ${req.url} not found on this server` });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Detailed Server Error:', err.stack);
  res.status(500).send({ message: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
});
