const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const singup_get = (req,res)=>{
    res.render("signup")
}
//Handle Errors
const handleErrors=(err)=>{
    // console.log(err.message,err.code)
    console.log(err.message)
    let errors ={email :"",password:""}
    // console.log(err.errors)
    // if email failed:
    if(err.code===11000){
        errors.email = "This email already exsists"
        return errors
    }


    //if validation failed:
    if(err.message.includes("user validation failed")){
        Object.values(err.errors).forEach(props=>{
            errors[props.path] = props.message
        })

    }
    return errors

}
const maxAge = 3*24*3600
const createToken=(id)=>{
    return jwt.sign({id},"let admiral on my site!",{
        expiresIn:maxAge
    })
}
const signup_post= async (req,res)=>{
    const {email,password} = req.body
    console.log(email)
    try{
        const newPassword =await  bcrypt.hash(password, 15)
        const user =await User.create({email,password:newPassword})
        const token = createToken(user._id)
        res.cookie("jwt",token,{httpOnly:true,maxAge:maxAge*1000})
        console.log(token)
        console.log(user)
        res.status(201).json({user:user._id})
    }
    catch(err){
        const errors = handleErrors(err)
        res.json({errors})
    }
}
const login_get = (req,res)=>{
    res.render("login")
}
const login_post = (req,res)=>{
    res.json("How can i get to Taksim ?")
}
module.exports = {
    signup_post,
    login_post,
    singup_get,
    login_get
}