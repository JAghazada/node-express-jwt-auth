const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
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
    }


})
userSchema.statics.login = async function(email,password){
    console.log(email,password)
    const user =  await this.findOne({email})
    console.log("user: ",user)
    if(user){
        const auth = await bcrypt.compare(password,user.password)
        console.log(auth)
        if(auth){
            console.log(user)
            return user;
        }
        throw Error ("Password is invalid")
    }else{
    throw Error ("User not exsists")
    }
}
const User = mongoose.model("user",userSchema)

module.exports = User