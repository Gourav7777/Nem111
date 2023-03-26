
const jwt = require("jsonwebtoken")

 const auth=(req,res,next)=>{

    let token = req.headers.authorization
     console.log("7")
     
    if(req.headers.authorization){

        token=token.split(' ')[1]
        
      const decoded=  jwt.verify(token, 'bruce') 
            console.log(decoded)
            if(decoded){
                req.body.userID= decoded.userID
                next()
            }
            else{
                res.status(400).send({"msg":err})
            }
            // decoded?res.status(200).send("token matched you can proceeed"):res.status(400).send({"msg":err})
    
    }


    else{
        res.status(400).send({"msg":"No token Provided you cannot proceeed"})
    }



 }


 module.exports={auth}