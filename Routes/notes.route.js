


const express = require("express")
const {NoteModel}  = require("../Model/notesmodel")

 
  const notesroute = express.Router()
  const bcrypt = require("bcrypt")
  var jwt = require('jsonwebtoken');


  notesroute.get("/",async(req,res)=>{

    const token = req.headers.authorization.split(" ")[1]
    const decoded=jwt.verify(token,"bruce")
    try{
        if(decoded){
            const notes=await NoteModel.find({"userID":decoded.userID})
            res.status(200).send(notes)
        }
    } catch(err){
        res.status(400).send({"msg":err.message}) 
    }
  })

  notesroute.post("/add",async(req,res)=>{

     
    const payload = req.body
    console.log(req.headers.authorization)
    const note = await new NoteModel(payload)
    note.save()
    res.status(200).send({"msg":"new note has been added"})
  })


  notesroute.patch("/update/:noteID",async(req,res)=>{
    const noteID = req.params.noteID
    const payload= req.body
    let  notes = await NoteModel.findByIdAndUpdate({_id:noteID},payload)
         notes = await NoteModel.findById({_id:noteID})
    res.status(200).send(notes)
})

notesroute.delete("/delete/:noteID",async(req,res)=>{
    const noteID = req.params.noteID
   
    let  notes = await NoteModel.findByIdAndDelete({_id:noteID})
         
    res.status(200).send({"msg":"note has been deleted"})
})

module.exports={
    notesroute
}