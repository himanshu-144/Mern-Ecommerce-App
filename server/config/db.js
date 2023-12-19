const mongoose = require('mongoose');

const connectDB =  async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
             useUnifiedTopology: true
        })
        console.log(`mongoDB database is connected! ${conn.connection.host}`.blue)
    }catch(error){
        console.error(`Error: ${error}`.red)
        process.exit(); 
    }
   

}

module.exports =connectDB
