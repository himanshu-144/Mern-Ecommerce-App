const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
     username :{
        type: String,
        required:true,
        unique:true
     },
     password:{
        type: String,
        required :true,
        unique :true
     },
     availableMoney:{
       type:Number,
       default:5000,
     },
     purchasedItems:{
      type : mongoose.Schema.Types.ObjectId,
      ref : 'Product',
      default : [],
     }
    
},{
    timestamps:true
})

const User = mongoose.model('User', userSchema);
module.exports = User