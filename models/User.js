const mongoose = require("mongoose")
const {isEmail}= require("validator")
const userSchema =new mongoose.Schema({
    email:{
        type:String,
        lowercase:true,
        unique:true,
        required:[true,"Please enter an email"],
        validate:[isEmail,"Please enter a valid email"]
    },
    password :{
        type:String,
        required:[true,"Please enter a password"],
        minlength:[6,"Password's min length is 6"],
        // validate:[(password)=>{password.length < 6 ? "Password's min length is 6.": "" }]
    }


})
const User = mongoose.model("user",userSchema)
module.exports = User