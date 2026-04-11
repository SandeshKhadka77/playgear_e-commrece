const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/product');
const User = require('./models/userModel');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/playgear_nepal';

const users = [
  {
    name: 'Play Gear Admin',
    email: 'admin@playgear.com',
    password: 'Admin@123',
    isAdmin: true,
  },
  {
    name: 'Demo User',
    email: 'user@playgear.com',
    password: 'User@123',
    isAdmin: false,
  },
];

const products = [
  {
    name: 'Adjustable Dumbbells',
    category: 'Fitness',
    price: 8500,
    image: '/assets/Dumbel.png',
    description: 'Perfect for home workouts, 2kg to 20kg.',
    countInStock: 15,
    rating: 4.5,
  },
  {
    name: 'Classic Football',
    category: 'Sports',
    price: 2500,
    image: '/assets/football.png',
    description: 'High-quality synthetic leather football.',
    countInStock: 25,
    rating: 4.2,
  },
  {
    name: 'RGB Mechanical Keyboard',
    category: 'Gaming',
    price: 4500,
    image: '/assets/Keyboard.png',
    description: 'Blue switches with customizable RGB lighting.',
    countInStock: 10,
    rating: 4.8,
  },
  {
    name: 'Gaming Headset Pro X',
    category: 'Gaming',
    price: 6200,
    image: '/assets/headset.png',
    description: 'Low-latency headset with surround sound and clear mic.',
    countInStock: 18,
    rating: 4.6,
  },
  {
    name: 'Cricket Bat Premium',
    category: 'Sports',
    price: 9800,
    image: '/assets/cricket-bat.png',
    description: 'Balanced willow bat designed for powerful strokes.',
    countInStock: 9,
    rating: 4.4,
  },
  {
    name: 'Resistance Band Set',
    category: 'Fitness',
    price: 1800,
    image: '/assets/resistance-band.png',
    description: 'Five-level resistance bands for strength and mobility.',
    countInStock: 40,
    rating: 4.3,
  },
];

const validateProducts = (items) => {
  for (const item of items) {
    if ((Number(item.price) || 0) < 0) {
      throw new Error(`Invalid product price for ${item.name}: cannot be negative`);
    }
    if ((Number(item.countInStock) || 0) < 0) {
      throw new Error(`Invalid stock for ${item.name}: cannot be negative`);
    }
    const rating = Number(item.rating) || 0;
    if (rating < 0 || rating > 5) {
      throw new Error(`Invalid rating for ${item.name}: must be between 0 and 5`);
    }
  }
};

const importData = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    validateProducts(products);

    await Product.deleteMany();
    await User.deleteMany({ email: { $in: users.map((u) => u.email) } });

    await User.create(users);
    await Product.insertMany(products);

    console.log('Data imported successfully');
    console.log('Admin login: admin@playgear.com / Admin@123');
    console.log('User login: user@playgear.com / User@123');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    await Product.deleteMany();
    await User.deleteMany({ email: { $in: users.map((u) => u.email) } });
    console.log('Seed data destroyed');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}