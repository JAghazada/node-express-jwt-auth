const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const singup_get = (req,res)=>{
    res.render("signup")
}
//Handle Errors
const handleErrors=(err)=>{
    let errors ={email :"",password:""}
    console.log(err.message)
    if(err.message === "User not exsists"){
        errors.email = "this email was not registered"
    }
    if(err.message === "Password is invalid"){
        errors.password = "This password not valid"
    }
    if(err==="inpass"){
        errors.password = "Please enter a 6 digit password!"
        errors.email = ""
        console.log(errors)
        return errors
    }
    // if email failed:
    if(err.code===11000){
        errors.email = "This email already exsists"
        return errors
    }
    console.log(errors)
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
    try{
        if(password === null || password=== undefined || password === " " || password === ""){
            const err = handleErrors("inpass")
            res.json({errors:err})
            
        }
        else{
            const newPassword =await  bcrypt.hash(password, 15)
            const user =await User.create({email,password:newPassword})
            const token = createToken(user._id)
            res.cookie("jwt",token,{httpOnly:true,maxAge:maxAge*1000})
            res.redirect("/smoothies")
            res.status(201).json({user:user._id})
        }
    }
    catch(err){
        const errors = handleErrors(err)
        res.json({errors})
    }
}
const login_get = (req,res)=>{
    res.render("login")
}
const login_post = async(req,res)=>{
    const {email,password} = req.body
    try {
        const user = await User.login(email,password)
        const token = createToken(user._id)
        res.cookie("jwt",token,{httpOnly:true,maxAge:maxAge*1000})
        res.redirect("/smoothies")
    } catch (error) {
        const errors = handleErrors(error)
        res.json({errors})
    }

}
const logout_get = async(req,res)=>{
    res.cookie("jwt","",{maxAge:1})
    res.redirect("/")
}
module.exports = {
    signup_post,
    login_post,
    singup_get,
    login_get,
    logout_get
}