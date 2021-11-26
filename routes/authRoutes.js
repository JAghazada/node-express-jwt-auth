const {Router} = require("express")
const router = Router()
const {signup_post,singup_get,login_post,login_get} = require("../controller")
router.get("/signup",singup_get)
router.post("/signup",signup_post)
router.get("/login",login_get)
router.post("/login",login_post)
module.exports = router