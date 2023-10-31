const express=require("express")
const router=express.Router()
const authController =require("../controllers/auth")
router.post("/register", authController.register)
router.post("/login", authController.login)
router.post("/adminlogin", authController.adminlogin)

/*router.get('/register', (req, res)=>{
    res.json("Hello this is the routes reigster")
})

router.get('/login', (req, res)=>{
    res.json("Hello this is the routes login")
})*/

module.exports=router