

 const mongoose = require("mongoose")
 
 require("dotenv").config()
 

  const userSchema= mongoose.Schema({
    email:String,
    pass:String,
    location:String,
    age:Number
    
  })


const UserModel = mongoose.model("auth",userSchema)
module.exports={UserModel}