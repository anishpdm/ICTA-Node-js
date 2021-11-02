const mongoose=require('mongoose')

let MongooseSchema = mongoose.Schema

const todoSchema=new MongooseSchema(
{
    title:String,
    description:String,
    remarks:String,
    date:Date
}  
)

var todoModel=mongoose.model("todos",todoSchema)

module.exports={todoModel}