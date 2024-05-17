const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
    email : {
        type : String
    },
    mobileNo : {
        type : String,
    },
    carBrand : {
        type : String,
    },
    carModel : {
        type : String,
    },
    carYear : {
        type : Date,
    },
    engineSize : {
        type : String,
    },
    suminsuredValue : {
        type : String,
    },
    provinceCity : {
        type : String
    }
})


const Lead = mongoose.model('Lead', leadSchema);


module.exports = Lead;