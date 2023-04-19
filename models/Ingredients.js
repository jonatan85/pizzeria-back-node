const mongoose = require('mongoose');

const ingredientsSchema = new mongoose.Schema(
    {
        name: { type: String, unique: true},
        price: { type: Number, required: true},
        picture: String,
    },
    {
        timestamps: true
    }
)

const Ingredients = mongoose.model('Ingredients', ingredientsSchema);

module.exports = Ingredients;