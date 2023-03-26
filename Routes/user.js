
  const express = require("express")
  const {UserModel} = require("../Model/usermodel")
  const userroute = express.Router()
  const bcrypt = require("bcrypt")
  var jwt = require('jsonwebtoken');

  userroute.post("/register",async(req,res)=>{
     const {email,pass,location,age} = req.body
   
   bcrypt.hash(pass, 5, async(err, hash) =>{
      const user = new UserModel({email,pass:hash,location,age})
      
      await user.save()
      res.status(200).send({"msg":"new user has been updated"})
  });
    
   
})

userroute.post("/login",async(req,res)=>{
  const email = req.body.email
  const pass = req.body.pass
   try {
      
      const user = await UserModel.findOne({email})
      console.log(user)
      if(user){
         bcrypt.compare(pass, user.pass, function(err, result) {
            
              if(result){

                 res.send({"msg":"user found login successfull","token":jwt.sign({ "userID": user._id }, 'bruce')})
              }
              else{
               res.send({"msg":"login unsuccessful"}) 
              }

        });

      }
      else{
         res.send({"msg":"user not found"}) 
      }
   } catch (error) {
      res.send({"msg":error.message})
   }

})


// userroute.get("/details",(req,res)=>{

//   const token = req.headers.authorization.split(' ')[1]
//   console.log(req.headers.authorization.split(' '))

//   jwt.verify(token, 'bruce', function(err, decoded) {
//    console.log(decoded)
//     decoded?res.status(200).send("token matched you can proceeed"):res.status(400).send({"msg":err})
//  })
 
   

// })
 module.exports= userroute

 
 