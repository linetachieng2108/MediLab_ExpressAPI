let mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');
//email, username, phone, password, status

let admin_schema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required:  true
    },
    status: {
        type: String,
        required: true
    }

});

mongoose.Schema.plugin(uniqueValidator, {"message": "Email Already in Use"})
module.exports = mongoose.model("Admin", admin_schema);