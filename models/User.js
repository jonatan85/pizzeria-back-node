const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { 
        type: String,
        required: true,
        match: [/^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/, 'El email no tiene un formato válido']
    },
    password: {type: String, require: true },
    name: { type: String, require: true },
    surnames: { type: String, require: true },
    address: { type: String, require: true },
    postaCode: { type: String, require: true },
    city: { type: String, require: true },
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;