const User = require("../models/user");
const bcrypt = require("bcryptjs");


//---new user creation---
const user = async(req,res)=>{
    try{
        const{name, email, password, base, role} = req.body;

        const existingUser = await User.findOne({email: email});
        if(existingUser){
            return res.status(400).json({message: "User already exist"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name : name,
            email : email,
            password : hashpassword,
            base : base,
            role : role,
        });
        await newUser.save();

        res.status(201).json({
            message : "User created successfully",
            user:{
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
            }
        })
    }catch(error){
        console.error(error.message);
        return res.status(500).json({message: "Server error in user creation"});

    }
};

//---get all users--
const getUsers = async(req,res)=>{
    try{
        const users = await User.find({},'-password');
        res.status(200).json(users);

    }catch(error){
        console.error(error.message);
        return res.status(500).json({message: "Server error in fetching all users"});
    }

};

//---delete users---
const deleteUser = async(req,res)=>{
    try{
        const userid = req.params.id;

        const deleteuser = await User.findByIdAndDelete(userid);
        if(!deleteuser){
            return res.status(400).json({message: "user not found"});
        }
        return res.status(200).json({message: "user deleted successfully"});
    }catch(error){
        console.error(error.message);
        return res.status(500).json({message: "Error deleting user"});
    }
};

module.exports = {user, getUsers, deleteUser};