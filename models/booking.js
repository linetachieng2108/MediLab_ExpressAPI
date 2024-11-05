let mongoose = require("mongoose");
let Patient = require('./patient');
let Test = require('./test');

//patient_id, test_id, appointment_date, appointment_time, status, invoice_no

let booking_schema = mongoose.Schema({
    patient_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient"
    },
    test_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tests"
    },
    appointment_date: {
        type: String,
        required: true 
    },
    appointment_time: {
        type: String,
        required: true 
    },
    status: {
        type: String,
        default: "Pending"
    },
    invoice_no: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Booking", booking_schema);

