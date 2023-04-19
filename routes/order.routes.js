const express = require('express');
const createError = require('../utils/errors/create-error.js');
const Order = require('../models/Order.js');

const orderRouter = express.Router();

orderRouter.get('/', async (req, res, next) => {
    try {
      const orders = await Order.find();
      return res.status(200).json(orders);
    } catch (err) {
      next(err);
    }
  });

  orderRouter.get('/:id', async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) {
        return res.status(404).send('Order not found');
      }
      return res.status(200).json(order);
    } catch (err) {
      next(err);
    }
  });
 
  orderRouter.post('/', async (req, res, next) => {
    try {
      const newOrder = new Order({
        items: req.body.items.map(item => Object.assign({}, item)),
        total: req.body.total
      });
      const createOrder = await newOrder.save();
      return res.status(201).json(createOrder);
    } catch (err) {
      next(err);
    }
  });

  orderRouter.post('/pizzas', async (req, res, next) => {

  try {
    
    const newOrder = new Order({ ...req.body });
    
    const createdOrder = await newOrder.save();
    
    return res.status(201).json(createdOrder);
    
  
    
   } catch (err) {
    
    next(err);
    
    }
    
      });

  orderRouter.put('/:id', async (req, res, next) => {
    try {
      const order = await Order.findByIdAndUpdate(req.params.id, {
        items: req.body.items.map(item => Object.assign({}, item)),
        total: req.body.total
      }, { new: true });
      if (!order) {
        return res.status(404).send('Order not found');
      }
      return res.status(200).json(order);
    } catch (err) {
      next(err);
    }
  });

  orderRouter.delete('/:id', async (req, res, next) => {
    try {
      const order = await Order.findByIdAndDelete(req.params.id);
      if (!order) {
        return res.status(404).send('Order not found');
      }
      return res.status(204).send();
    } catch (err) {
      next(err);
    }
  });
 
 

 
 module.exports = orderRouter;