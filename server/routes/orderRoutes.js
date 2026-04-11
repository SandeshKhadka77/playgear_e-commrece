const express = require('express');
const router = express.Router();
const Order = require('../models/orderModel');
const { protect, admin } = require('../middleware/authMiddleware');

// @desc    Create a new order
// @route   POST /api/orders
router.post('/', protect, async (req, res) => {
  try {
    const { orderItems, shippingPrice = 0, taxPrice = 0, totalPrice = 0 } = req.body;

    if (!Array.isArray(orderItems) || orderItems.length === 0) {
      return res.status(400).json({ message: 'Order items are required' });
    }

    const normalizedItems = orderItems.map((item) => ({
      product: item.product,
      name: item.name,
      image: item.image,
      qty: Number(item.qty) || 1,
      price: Number(item.price) || 0,
    }));

    const order = await Order.create({
      user: req.user._id,
      orderItems: normalizedItems,
      shippingPrice: Number(shippingPrice) || 0,
      taxPrice: Number(taxPrice) || 0,
      totalPrice: Number(totalPrice) || 0,
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
