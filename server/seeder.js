const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/product'); // Your Product model

dotenv.config();


const products = [
  {
    name: "Adjustable Dumbbells",
    category: "Gym",
    price: 8500,
    image: "/assets/Dumbel.png", 
    description: "Perfect for home workouts, 2kg to 20kg.",
    countInStock: 15,
    rating: 4.5
  },
  {
    name: "Classic Football",
    category: "Sports",
    price: 2500,
    image: "/assets/football.png", 
    description: "High-quality synthetic leather football.",
    countInStock: 25,
    rating: 4.2
  },
  {
    name: "RGB Mechanical Keyboard",
    category: "Gaming",
    price: 4500,
    image: "/assets/Keyboard.png", 
    description: "Blue switches with customizable RGB lighting.",
    countInStock: 10,
    rating: 4.8
  }
];

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // Clear existing products to avoid duplicates
    await Product.deleteMany();
    
    // Insert new products
    await Product.insertMany(products);
    
    console.log('✅ Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

importData();