const mongoose=require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/DearDiary",{useNewUrlParser:true})

const dduser=mongoose.model("dduser",
{ 
    fname:String,
    lname:String,
    userid:String,
    email:String,
    password: String, 
    journal:[]
})

module.exports={
    dduser
}