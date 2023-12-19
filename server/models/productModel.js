const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  
    productName:{
       type :String,
       required : true,
    },
    productPrice :{
        type :Number,
        required :true,
        min : [1,'Price of product should be above 1.'],
    
    },
    description :{
        type:String,
        required:true,
    },
    imageURL :{
        type :String,
        required :true,
    },
    quantity:{
        type :Number,
        required :true,
        min :[0, "Quantity can't be lower than 0."],
    },
},{
    timestamps:true
})

const Product = mongoose.model('Product', productSchema);
module.exports = Product