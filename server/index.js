const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");
const morgan = require("morgan")
const dotenv = require("dotenv")
dotenv.config();
const userRouter = require("./routes/authRoute");
const productRouter = require("./routes/productRoute");
const colors =require("colors")
connectDB();
const PORT = process.env.PORT || 8000;
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/api/v1/auth', userRouter);
app.use('/api/v1/product', productRouter);

app.get('/', (req, res)=>{
    res.send("hello himanshu")
})

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`.yellow.bold);
})