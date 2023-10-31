const mysql=require("mysql2")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcryptjs")
const db=mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "mysql2023",
    database:"test"
})

const db2=mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "mysql2023",
    database:"test"
})

exports.register=(req, res)=>{
  //  console.log(req.body)
    let terminated=false
    const {id, firstName, lastName, address, phoneNumber, username, password}=req.body
    db.query('SELECT * FROM userlogin WHERE id=? OR username=?', [id, username], async (error, results)=>{
        if(error) console.log(error)
        else{
            if(results.length>0){
             terminated=true
             //console.log(results)
              return res.json("EXISTS")
              console.log("id")
            }
        }
        //let hashedPassword=await bcrypt.hash(password, 8)
        //console.log(hashedPassword)
        if(terminated) return
        const q="INSERT INTO userdata (`id`, `firstName`, `lastName`, `phoneNumber`, `address`) VALUES (?)"
        const values=[
            req.body.id,
            req.body.firstName,
            req.body.lastName,
            req.body.phoneNumber,
            req.body.address
        ]
    
        db.query(q, [values], (error, data)=>{
            if(error) return res.json(error)
            //return res.json("Hello, has been created successfully")
        })
        const q2="INSERT INTO userlogin SET  (`id`, `username`, `password`) VALUES (?)"
        const values2=[
            req.body.id,
            req.body.username,
            req.body.password
        ]
    
        db2.query('INSERT INTO userlogin SET ?', {id:id, username: username, password:password}, ()=>{
            if(error) return res.json(error)
           // return res.json("Hello, has been created successfully")
        })
        //if(!terminated)return res.json("successful registration")
        return res.json("successful registration")
    })
}

exports.login=(req, res)=>{
      console.log(req.body)
    
      const {username, password}=req.body
      db.query('SELECT * FROM userlogin WHERE username=?', [username], async (error, results)=>{
          if(error) console.log(error)
          else{
            console.log(results)
              if(results.length>0&&results[0].password==password){

              // terminated=true
               //console.log(results)
                return res.json(results[0].id)
                //console.log("id")
              }
              else{
               // res.status(404)
                return res.json("NONE")
              }
          }
          
      })
  }


  exports.adminlogin=(req, res)=>{
    console.log(req.body)
  
    const {username, password}=req.body
    db.query('SELECT * FROM admins WHERE username=?', [username], async (error, results)=>{
        if(error) console.log(error)
        else{
          console.log(results)
            if(results.length>0&&results[0].pass==password){

            // terminated=true
             //console.log(results)
              return res.json(results[0].id)
              //console.log("id")
            }
            else{
             // res.status(404)
              return res.json("NONE")
            }
        }
        
    })
}