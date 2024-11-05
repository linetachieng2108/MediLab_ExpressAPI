let mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');
//surname, other names, gender, reg_date, email, password
let nurse_schema = mongoose.Schema({
    surname:{
        type: String,
        required: true
    },
    othernames:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    reg_date:{
        type: Date,
        default: Date.now
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }

});

mongoose.Schema.plugin(uniqueValidator, {"message": "Email Already in Use"})
module.exports = mongoose.model("Nurse", nurse_schema);