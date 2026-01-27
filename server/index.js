const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const productRoutes = require('./routes/productRoutes');

// 1. Load Environment Variables
dotenv.config();

const app = express();

// 2. Middleware
// Updated CORS to be more explicit to avoid browser blocks
app.use(cors({
  origin: 'http://localhost:5173', // Matches your Vite frontend port
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json()); // Allows server to read JSON data

// 3. Database Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/playgear_nepal';

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Successfully'))
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err.message);
    process.exit(1); 
  });

// 4. API Routes
app.use('/api/products', productRoutes);

// 5. Test Route
app.get('/', (req, res) => {
  res.send('PlayGear Nepal API is running...');
});

// 6. Global Error Handler (Added this to help you debug)
app.use((err, req, res, next) => {
  console.error('Detailed Server Error:', err.stack);
  res.status(500).send({ message: err.message });
});

// 7. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});