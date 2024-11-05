let mongoose = require("mongoose");
let Patient = require('./patient');
const { required } = require("@hapi/joi");

let location_schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    patients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient"
    },
    ]
});

module.exports = mongoose.model("Location", location_schema);