const express=require("express")
const mysql=require("mysql2")
const app=express()
const cors=require("cors")

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

app.use(express.json())
app.use(cors())

/*app.get("/", (req, res)=>{
    res.json("hello this is the backend")
})*/

app.use('/', require('./routes/pages'))
app.use('/auth', require('./routes/auth'))
app.use('/admin', require('./routes/admin'))

app.get("/userdata", (req, res)=>{
    const q="SELECT * FROM userdata"
    db.query(q, (error, data)=>{
        if(error){
            return res.json(error)
        }
        else{
           return res.json(data)
        }
    })
})


app.get("/getuserdata/:userid", (req, res)=>{
     const userid=req.params.userid
    const q="SELECT * FROM userdata WHERE ID = ?"
    db.query(q, [userid], (error, data)=>{
        if(error){
            return res.json(error)
        }
        else{
           return res.json(data)
        }
    })
})

app.post("/userlogin", (req, res)=>{
    const q="INSERT INTO userlogin (`id`, `username`, `password`) VALUES (?)"
    const values=[
       req.body.id,
       req.body.username,
       req.body.password
    ]

    db.query(q, [values], (error, data)=>{
        if(error) return res.json(error)
        return res.json("Hello, has been created successfully")
    })
})


app.post("/userdata", (req, res)=>{
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
        return res.json("Hello, has been created successfully")
    })
})

app.delete("/userdata/:id", (req, res)=>{
    const userid=req.params.id
    const q="DELETE FROM userdata WHERE id = ?"

    db.query(q, [userid], (error, data)=>{
        if(error) return res.json(error)
        return res.json("user account deleted successfully")
    })
})

app.put("/userdata/:id", (req, res)=>{
    const userid=req.params.id
    const q="UPDATE userdata SET `firstName`=?, `lastName`=?,  `phoneNumber`=?, `address`=? WHERE id = ?"

    const values=[
        req.body.firstName,
        req.body.lastName,
        req.body.phoneNumber,
        req.body.address
    ]

    db.query(q, [...values, userid], (error, data)=>{
        if(error) return res.json(error)
        return res.json("user account updated successfully")
    })
})

app.listen(3010, ()=>{
    console.log("Connected to backend")
})