const express = require('express');
const router = express.Router();
const Product = require('../models/product'); // This imports your blueprint

// @desc    Fetch all products from MongoDB
// @route   GET /api/products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({}); // Finds every product in your DB
    res.json(products); // Sends the products back to your Frontend
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error: Could not fetch products' });
  }
});

// @desc    Fetch a single product by ID (Useful for Product Details page)
// @route   GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (product) {
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// admin stats route
// @desc    Get product, order, sales, and user stats for admin dashboard
// @route   GET /api/products/admin/stats

router.get('/admin/stats', async (req, res) => {
  try {
    const productCount = await Product.countDocuments();
    // For now, we return 0 for orders/sales until we build those models
    res.json({
      productCount: productCount,
      orderCount: 0,
      totalSales: 0,
      userCount: 1 // Placeholder
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;