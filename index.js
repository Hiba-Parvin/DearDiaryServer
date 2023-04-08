const express = require("express")
const ds=require("./services/dataService")

const app=express()

// app.post("/login", (req, res) => {
//     ds.login(req.body.uid, req.body.psw).then(result=>{
//     res.status(result.statusCode).json(result)
//     })
// })

//import cors
const cors=require("cors")

app.use(cors({origin:'http://localhost:4200'}))
app.use(express.json())

app.post("/register", (req, res) => {
    ds.register(req.body.fname,req.body.lname,  req.body.userid,  req.body.email, req.body.psw).then(result => {
        res.send(result)
    })
})

//login - get
app.post("/login", (req, res) => {
    ds.login(req.body.userid, req.body.psw).then(result=>{
        res.send(result)
    // res.status(result.statusCode).json(result)
    })
})


app.listen(3000,()=>{
    console.log("server started at port 3000");
})