const express=require("express")
const router=express.Router()

router.get("/", (req, res)=>{
    res.json("hello this is the routes backend")
})

router.get('/register', (req, res)=>{
    res.json("Hello this is the routes reigster")
})

router.get('/login', (req, res)=>{
    res.json("Hello this is the routes login")
})

module.exports=router