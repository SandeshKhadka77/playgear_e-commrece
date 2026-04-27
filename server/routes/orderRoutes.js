const express = require('express');
const router = express.Router();
const Order = require('../models/orderModel');
const Product = require('../models/product');
const { protect, admin } = require('../middleware/authMiddleware');

// @desc    Create a new order
// @route   POST /api/orders
router.post('/', protect, async (req, res) => {
  try {
    const { orderItems, shippingPrice = 0, taxPrice = 0, totalPrice = 0 } = req.body;

    if (!Array.isArray(orderItems) || orderItems.length === 0) {
      return res.status(400).json({ message: 'Order items are required' });
    }

    const shipping = Number(shippingPrice);
    const tax = Number(taxPrice);

    if (Number.isNaN(shipping) || shipping < 0) {
      return res.status(400).json({ message: 'shippingPrice must be a non-negative number' });
    }

    if (Number.isNaN(tax) || tax < 0) {
      return res.status(400).json({ message: 'taxPrice must be a non-negative number' });
    }

    const normalizedItems = [];
    let itemsTotal = 0;

    for (const item of orderItems) {
      const productId = item.product;
      const quantity = Number(item.qty);

      if (!productId) {
        return res.status(400).json({ message: 'Each order item must include a product id' });
      }

      if (!Number.isInteger(quantity) || quantity <= 0) {
        return res.status(400).json({ message: 'Each order item qty must be a positive integer' });
      }

      const product = await Product.findById(productId);
      if (!product) {
        return res.status(400).json({ message: `Product not found for id ${productId}` });
      }

      normalizedItems.push({
        product: product._id,
        name: product.name,
        image: product.image,
        qty: quantity,
        price: product.price,
      });

      itemsTotal += product.price * quantity;
    }

    const computedTotalPrice = itemsTotal + shipping + tax;

    const order = await Order.create({
      user: req.user._id,
      orderItems: normalizedItems,
      shippingPrice: shipping,
      taxPrice: tax,
      totalPrice: computedTotalPrice,
      status: 'Pending',
    });

    return res.status(201).json(order);
  } catch (error) {
    return res.status(500).json({ message: 'Could not create order' });
  }
});

// @desc    Get logged-in user's orders
// @route   GET /api/orders/my
router.get('/my', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    return res.json(orders);
  } catch (error) {
    return res.status(500).json({ message: 'Could not fetch your orders' });
  }
});

// @desc    Get all orders
// @route   GET /api/orders
router.get('/', protect, admin, async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    return res.json(orders);
  } catch (error) {
    return res.status(500).json({ message: 'Could not fetch orders' });
  }
});

// @desc    Update order status
// @route   PUT /api/orders/:id/status
router.put('/:id/status', protect, admin, async (req, res) => {
  try {
    const { status } = req.body;
    const allowedStatuses = ['Pending', 'Confirmed', 'Shipped', 'Delivered'];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;
    const updatedOrder = await order.save();
    return res.json(updatedOrder);
  } catch (error) {
    return res.status(500).json({ message: 'Could not update order status' });
  }
});

module.exports = router;
