const jwt = require("jsonwebtoken");
const User = require("../models/user");

//---verify JWT Token---
const verifyToken = async(req,res,next)=>{
    const authHeader = req.headers["authorization"];
    //---split authorization header to extract token----
 try{
    if(authHeader && authHeader.startsWith("Bearer")){
        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userId = decoded.id;
        req.role = decoded.role;
        next();

    }else{
        return res.status(403).json({msg: "Authentication failed"});
    }
}catch(error){
    return res.status(401).json({msg: "Invlaid or expired token"})
}
};

//---verify role---
const authorizeRole = (roles)=>{
    return(req,res,next)=>{
        if(!req.role){
            return res.status(403).json({message: "No role found"});
        }
        if(roles.includes(req.role)){
           next(); 
        }else{
            return res.status(403).json({message: "You dont have persmission"});
        }

    };
};

module.exports = {verifyToken, authorizeRole};