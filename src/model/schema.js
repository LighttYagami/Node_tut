const mongoose = require("mongoose");
const validator = require("validator");

const userSchema =mongoose.Schema({
    email:{
        type: String,
        required: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email id")
            }
        }
    },
    name:{
        type: String,
        minLength: 3,
        required: true
    },
    message:{
        type: String,
        minLength: 3,
        required: true
    }
})

const User = mongoose.model("User",userSchema);

module.exports = User;