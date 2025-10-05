const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


//---users login---
const login = async(req,res)=>{
    try{
        const {email, password} = req.body;

        //---validating from db---
        const existinguser = await User.findOne({email});
        if(!existinguser){
            return res.status(400).json({msg: "Invalid email or password"});
        }

        //---after validation, comparing password---
        const isPassword = await bcrypt.compare(password, existinguser.password);
        if(!isPassword){
            return res.stauts(400).json({msg: "Incorrect password"});
        }

        //---generating token---
        const token = jwt.sign({id : existinguser._id , role: existinguser.role }, process.env.JWT_KEY, {expiresIn : '1h'});
        res.status(200).json({
            msg: "Login Successfull",
            token,
            user : {
                name : existinguser.name,
                email : existinguser.email,
                role : existinguser.role,
                base : existinguser.base,
            }
        })
    }catch(error){
        console.error("Login error", error);
        res.stauts(500).json({msg:"Server error in login", error: error.message});
    }
};

module.exports = {login};