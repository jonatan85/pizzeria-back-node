const express = require('express');
const Ingredients = require('../models/Ingredients.js');
const createError = require('../utils/errors/create-error.js');
const ingredientsRouter = express.Router();



ingredientsRouter.get('/', async(req, res, next) => {
    try {
        const ingredients = await Ingredients.find();
        return res.status(200).json(ingredients);
    } catch(err) {
        next(err);
    }
});

ingredientsRouter.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        const ingredients = await Ingredients.findById(id);
        if (ingredients) {
            return res.status(200).json(ingredients);
        } else {
            next(createError('El ingrediente no existe.', 404));
        }
    } catch (err) {
        next(err);
    }
 });

 ingredientsRouter.post('/', async(req, res, next) => {
    try{
        const newIngredients = new Ingredients({ ...req.body});
        const createIngredients = await newIngredients.save();
        return res.status(201).json(createIngredients);
    } catch(err) {
        next(err);
    }
});

ingredientsRouter.put('/:id', async (req, res, next) => {
    try {
       const id = req.params.id;
       const modifiedIngredients = new Ingredients({...req.body});
       modifiedIngredients._id = id;
       const ingredientsUpdate = await Ingredients.findByIdAndUpdate(
          id,
          modifiedIngredients,
          {new: true}
       );
       return res.status(200).json(ingredientsUpdate);
    }catch (err) {
       next(err);
    }
  });

  ingredientsRouter.delete('/:id', async (req, res, next) => {
    try{  
       const id = req.params.id;
       await Ingredients.findByIdAndDelete(id);
       return res.status(200).json('El ingrediente se ha eliminado correctamente.')
    } catch(err) {
       next(err);
    }
  });



module.exports = ingredientsRouter;