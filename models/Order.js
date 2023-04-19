const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: [String]   
  ,
  total: {
    type: Number
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
