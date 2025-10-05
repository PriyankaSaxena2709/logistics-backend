const bcrypt = require("bcryptjs");
const User = require("../models/user");

//---seeding admin---
const generateAdmin = async ()=>{
    try{
        const adminEmail = process.env.Admin_email;
        const adminPassword = process.env.Admin_password;

        const existing = await User.findOne({email : adminEmail});
        if(!existing){
            const salt = await bcrypt.genSalt(10);
            const hashpassword = await bcrypt.hash(adminPassword, salt);

            const admin = new User({
                name : "superadmin",
                email : adminEmail,
                password : hashpassword,
            })
            
            await admin.save();
            console.log("Admin user seeded successfully");
        }else{
            console.log("Admin already exist");
        }
    }catch(error){
        console.log(error);
        console.error("Error in seeding function", error.message);
    }
};

module.exports = generateAdmin;