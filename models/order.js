const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: String,
  phone: String,
  items: [
    {
      _id: String,
      name: String,
      price: Number,
    //   kg: Number
    quantity: Number,
    unit: String
    }
  ],
  total: Number,
  status: {
    type: String,
    default: "Pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', orderSchema);