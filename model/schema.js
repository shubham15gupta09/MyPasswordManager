const mongoose = require("mongoose");

const detail = new mongoose.Schema({
    website: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String ,
        required: true ,
    },
    masterpassword :{
        type: String ,
        required: true ,    
    }
});

module.exports = mongoose.model("password_db", detail);