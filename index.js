// Imports
const express=require('express')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')
const {todoModel}=require('./model')
const { response } = require('express')

// Initialise
let app = express()

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

// CORS Policy
app.use( (req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET','POST');
    res.setHeader('Access-Control-Allow-Headers','X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials',true)
    next()
} )

// Db Connection
mongoose.connect("mongodb+srv://Vyshakhanil:Vyshakhanil@cluster0.kpplc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")

////////

app.get('/',(req,res)=>{
  res.send("Welcome to API")  
})


app.post('/add',async(req,res)=>{

try{
console.log(req.body)
let todo=new todoModel(req.body)
let result=await todo.save()
res.json(result) 

}
catch(error)
{
res.status(500).send(error)
}

})


app.post('/searchsingle',async (req,res)=>{
    try{
    
           var result=await todoModel.find(req.body.title)
            res.json(result)
    
    }
    catch(error)
    {
        console.log(error)
        res.status(500).send(error)
    
    }
    
    })

app.post('/search',async (req,res)=>{
try{

       var result=await todoModel.find({"title": {$regex:'.*'+req.body.title+'.*'} })
        res.json(result)

}
catch(error)
{
    res.status(500).send(error)

}

})


app.get("/view",async (req,res)=>{
    try{
        var result=await todoModel.find()
        res.json(result)

    }
    catch(error)
    {
        res.status(500).send(error)

    }
})


app.post('/update',async(req,res)=>{

   try{
    var result=await todoModel.findByIdAndUpdate(req.body._id,req.body)
    res.json({"status":"succesfully  Updated"})
   }
   catch(error)
   {
    res.send(500).json({"status":error})

   }

})


app.post('/delete',async(req,res)=>{
   
    try{
var result=await todoModel.findByIdAndDelete(req.body)
res.json({"status":"Succesfully Deleted"})

    }
    catch(error)
    {
        res.send(500).json({"status":error})

    }
    
})



app.listen(5000,()=>{
    console.log(' Running.........')
})







