require('dotenv').config();
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');
const cloudinary = require('cloudinary');

const connect = require('./utils/db/connect.js');

const pizzasRouter = require('./routes/pizzas.routes.js');
const userRouter = require('./routes/user.routes.js');
const ingredientsRouter = require('./routes/ingredients.routes.js');
const orderRouter = require('./routes/order.routes.js');
const DB_URL = process.env.DB_URL;

connect();

const PORT = process.env.PORT || 3000;
const server = express();

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_API_SECRET
});

// const whitelist =['http://localhost:3000/', 'http://localhost:4200/', 'http://localhost:50021/'];
//   const corsOptions = {
//       credentials: true,
//       origin: function(origin, callback) {
//           if(whitelist.indexOf(origin) !== -1) {
//               callback(null, true)
//           } else {
//               callback(new Error('Not allowed by CORS'))
//           }
//       }
//   };

//JSWBTKN
server.set("secretKey", "moneHeistApi");

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use(express.static(path.join(__dirname, 'public')));

//Passport
require('./utils/authentication/passport.js');

server.use(session({
    secret: "Hola mundo",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 600000
    },
    store: MongoStore.create({
        mongoUrl: DB_URL
    })

}));

server.use(passport.initialize());
server.use(passport.session());

server.get('/', (req,res) => {
    res.json("Bienvenido a TRADIZIONALE!");
});

server.use('/pizzas', pizzasRouter);
server.use('/user', userRouter);
server.use('/ingredients', ingredientsRouter);
server.use('/order', orderRouter);
server.use('/customer', customerOrderRouter);
server.use('/pizzeria-store', pizzeriaStoreRouter);


server.use((err, req, res, next) => {
    return res.status(err.status || 500).json(err.message || 'Unexpected error');
});

server.listen(PORT, () => {
    console.log(`El servidor está ecuchando en http://localhost:${PORT}`);
});

module.exports = server;