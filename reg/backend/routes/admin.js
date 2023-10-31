const express=require("express")
const router=express.Router()
const authController =require("../controllers/auth")
/*router.post("/admin", authController.register)

router.get("/", (req, res)=>{
    const q="SELECT * FROM admins"
    db.query(q, (error, data)=>{
        if(error){
            return res.json(error)
        }
        else{
           return res.json(data)
        }
    })
 })*/

 
module.exports=router