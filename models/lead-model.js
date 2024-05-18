const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
    email : {
        type : String
    },
    mobileNo : {
        type : String,
    },
    leads : [{
        carBrand : {
            type : String
        },
        carModel : {
            type : String
        },
        carYear : {
            type : Date
        },
        engineSize : {
            type : String
        },
        suminusredValue : {
            type : String
        },
        provinceCity : {
            type : String
        },
    }]
})


const Lead = mongoose.model('Lead', leadSchema);


module.exports = Lead;