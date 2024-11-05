let mongoose = require('mongoose');


//test_name, test_desc, test_cost, more_info
let test_schema = mongoose.Schema({
    test_name:{
        type: String,
        required: true
    },
    test_desc: {
        type: String,
        required: true
    },
    test_cost: {
        type: Number,
        required: true
    },
    more_info: {
        type: String,
    }

});
module.exports = mongoose.model("Test", test_schema);