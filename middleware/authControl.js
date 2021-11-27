const jwt = require("jsonwebtoken")
const User = require("../models/User")
const requireAuth = (req,res,next)=>{
    const token = req.cookies.jwt
    if(token){
        jwt.verify(token,"let admiral on my site!",(err,decodedToken)=>{
            if(err){
                console.log(err.message)
                res.redirect("/login")
            }else{
                console.log(decodedToken)
                next()
            }

        })
    }
    else if(token===undefined){
        res.redirect("/login")
    }
    else{
        res.redirect("/login")
    }
}
const checkValidUser =  (req,res,next) => {
    const token = req.cookies.jwt
    if(token){
        jwt.verify(token,"let admiral on my site!",async(err,decodedToken)=>{
            if(err){
                console.log(err.message)
                res.locals.user = null
                next()
            }else{
                console.log(decodedToken)
                let user = await User.findById(decodedToken.id)
                res.locals.user = user
                next()
            }

        })
    }
    else{
        res.locals.user = null
        next()
    }
}
module.exports = {requireAuth,checkValidUser}