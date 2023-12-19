const { hashPassword ,comparePassword } = require("../helpers/authHelper");
const User = require("../models/userModel");
var jwt = require("jsonwebtoken");
const registerController= async(req, res)=>{
    const {username, password} = req.body;
    try {
        if(!username || !password){
         return res.status(403).send({ message : "All Field Are Required"});
        }
        // existing user
        const existingUser = await User.findOne({username});
        if(existingUser){
            return res.status(400).send(
                {
                    success :true,
                    message :"User Already Exist"
                }
            );
        }
        const hashedPassword = await hashPassword(password);
        const user = new User({username, password :hashedPassword});
        await user.save();
        return res.status(201).json({
            success :true,
            message :"User Registered Successfully",
            user,
        });
        

    } catch (error) {
        console.log(error.message);
        return res.status(500).send({
            success :false,
            message : "Error in Registration"
        })
    }
};


const loginController = async(req, res)=>{
    const {username, password} = req.body;
    try {
        if(!username || !password){
            return res.status(403).send({ message : "All Field Are Required"});
        }
        const user  = await User.findOne({username});
        if(!user){
            return res.status(404).send({
                success :false,
                message : "User Not Found",
            })
        }
        const matchPassword  = await comparePassword(password, user.password);
        if(!matchPassword){
            return res.status(200).send({
                success :false,
                message : "Invalid Password",
            })
        }
        const token = await jwt.sign({_id : user._id}, process.env.JWT_SECRET, { expiresIn: '7d' });
         return res.status(201).json({
                success:true,
                message :"Login Successfull",
                token,
                user:{
                    _id :user._id,
                    username :user.username,
                    password :user.password,
                }
            })
        

    } catch (error) {
        console.log(error.message);
        return res.status(500).send({
            success :false,
            message : "Error in Login"
        })
    }
};

const availableMoney=async(req, res)=>{
   const {userID} = req.params;
   try {
    const user = await User.findById(userID);
    if (!user) {
      return res.status(400).json({ message :"No User Found"});
    }
    res.json({ availableMoney: user.availableMoney });
  } catch (err) {
    res.status(500).json({ message :err.message });
  }
};


module.exports = {registerController, loginController, availableMoney}