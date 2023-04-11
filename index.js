//Importing express and storing it in a variable
const express = require("express")

//import ds
const ds = require("./services/dataService")

//import jsonwebtoken
const jwt = require("jsonwebtoken")

//import cors
const cors=require("cors")

//App creation
const app = express()

//integrate app with frontend
app.use(cors({origin:'http://localhost:4200'}))

//To Covert All Datas From JSON To Js
app.use(express.json())

//Middleware Creation
const jwtMiddleware = (req, res, next) => {
    try {
        //accessing data from request header
        const token = req.headers['access_token']

        //verifying the token with secret key
        const data = jwt.verify(token, "superkey123")

        console.log(data);

        next()
    }
    catch {
        res.status(422).json({
            status: false,
            message: "Please Login.",
            statusCode: 404
        })
    }
}


app.post("/register", (req, res) => {
    ds.register(req.body.fname,req.body.lname,  req.body.userid,  req.body.email, req.body.psw).then(result => {
        res.status(result.statusCode).json(result)
    })
})

//login - get
app.post("/login", (req, res) => {
    ds.login(req.body.userid, req.body.psw).then(result=>{
        res.status(result.statusCode).json(result)
    // res.status(result.statusCode).json(result)
    })
})

app.post("/diary", jwtMiddleware, (req, res) => {
    console.log("Server Index : ",req.body.userid, req.body.diaryentry);
    ds.diary(req.body.userid, req.body.diaryentry).then(result=>{
        res.status(result.statusCode).json(result)
    })
})

app.post("/diaryentries", jwtMiddleware, (req, res) => {
    ds.getDiary(req.body.userid).then(result=>{
    res.status(result.statusCode).json(result)
    })
})
app.listen(3000,()=>{
    console.log("server started at port 3000");
})