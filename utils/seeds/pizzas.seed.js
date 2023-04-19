const mongoose = require('mongoose');
const Pizzas = require('../../models/pizzas.js');
const fs = require('fs');

const DB_URL = "mongodb+srv://root:g9Cc4yIWqO1K65KV@movieapi.n2e13fz.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async () => {
    const allPizza = await Pizzas.find();

    if (allPizza.length) {
        await Pizzas.collection.drop();
    }
}).catch(err => {
    console.log(`Ha habido un error eliminando los datos: ${err}`);
})


.then(async () => {
    const data = fs.readFileSync('./utils/seeds/db/pizzas.json');
    const parsedData = JSON.parse(data);
    const pizzasDocs = parsedData.map((pizza) => {
        return new Pizzas(pizza);
    });
    await Pizzas.insertMany(pizzasDocs);
})
.catch((err) => {
    console.log(`Ha habido un error añadiendo los elementos a la base de datos: ${err}`);
})
// mongoose.disconnect --> desconecta la conexión actual a la base de datos.
.finally(() => mongoose.disconnect());
