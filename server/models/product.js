const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  category: { type: String, required: true }, // e.g., 'Gaming', 'Football', 'Cricket'
  image: { type: String, required: true }, // URL or path to image
  countInStock: { type: Number, required: true, default: 0, min: 0 },
  rating: { type: Number, default: 0, min: 0, max: 5 },
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Product', productSchema);