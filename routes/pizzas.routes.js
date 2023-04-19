const express = require('express');
const imageToUri = require('image-to-uri');
const fs = require('fs');

const Pizzas = require('../models/Pizzas.js');
const createError = require('../utils/errors/create-error.js');
const isAuthJWT = require('../utils/authentication/jsonwebtoken.js');
const upload = require('../utils/middleware/file.middleware.js');

const pizzasRouter = express.Router();

pizzasRouter.get('/', async(req, res) => {
   try {
      const pizzas = await Pizzas.find().populate('ingredients');
      return res.status(200).json(pizzas);
  } catch(err) {
      next(err);
  }
});

pizzasRouter.get('/:id', async (request, response, next) => {
   try {
       const id = request.params.id;
       const allPizzas = await Pizzas.findOne({ id: id });
       return response.status(200).json(allPizzas);
   } catch (error) {
       next(error)
   }
});

pizzasRouter.post('/', async (req, res, next) => {
    try {
       
       const newPizzas = new Pizzas({...req.body });
       const createPizzas = await newPizzas.save();
        
       return res.status(201).json(createPizzas);
    } catch(err) {
       next(err);
    }
 });

pizzasRouter.put('/add-ingredients', async (req, res, next) => {
   try {
       const {pizzasId, ingredientsId} = req.body;
       if(!pizzasId) {
           return next(createError('Se necesita un id de pizza para poder añadir un ingrediente', 500))
       }
       if(!ingredientsId) {
           return next(createError('Se necesita un id de ingrediente para añadirlo a la pizza', 500))
       }
       const addPizza = await Pizzas.findByIdAndUpdate(
           pizzasId,
           {$push: {ingredients: ingredientsId}},
           {new: true }
       );
       return res.status(200).json(addPizza);
   } catch(err) {
       next(err);
   }
});

pizzasRouter.put('/:id', async (req, res, next) => {
   try {
      const id = req.params.id;
      const modifiedPizzas = new Pizzas({...req.body});
      modifiedPizzas._id = id;
      const pizzasUpdate = await Pizzas.findByIdAndUpdate(
         id,
         modifiedPizzas,
         {new: true}
      );
      return res.status(200).json(pizzasUpdate);
   }catch (err) {
      next(err);
   }
 });

pizzasRouter.delete('/:id', async (req, res, next) => {
   try{  
      const id = req.params.id;
      await Pizzas.findByIdAndDelete(id);
      return res.status(200).json('La pizza se a eliminado correctamente.')
   } catch(err) {
      next(err);
   }
 });

module.exports = pizzasRouter;