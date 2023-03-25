

const express= require("express")

const {connection} = require("./db")
 const userroute = require("./Routes/user")
 const {notesroute} = require("./Routes/notes.route")
 const {auth} = require("./Middleware/auth")
 const cors= require("cors")
const app = express()
// app.use(cors())

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
 });
app.use(express.json())
app.use("/users",userroute)
app.use(auth)
app.use("/notes",notesroute)

app.listen(4300,async()=>{
 
   try {
      
      await connection
      console.log("connected to mongo")
   } catch (error) {
      console.log(error)
   }
   console.log("port 4300")
      
})