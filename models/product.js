const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
    name:String,
    price:Number,
    img:String,
    quantity:Number,
    unit:String,
},{timestamps:true,versionKey:false})

module.exports=mongoose.model('product',productSchema)