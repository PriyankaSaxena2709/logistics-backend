const Expend = require("../models/expended");
const User = require("../models/user");


//--expended assets--
const expend = async (req,res)=>{
    try{
        const{items, expendedBy, expendedDate,remarks} = req.body;
        const user = await User.findById(req.userId);
        //validate base 

        let finalbase;
        if(user.role === 'Admin'){
            const{base} = req.body;
            if(!base){
                return res.status(400).json({message: "Admin must specify base"});
            }
            finalbase = base;
        }else{
            finalbase = user.base;
        }

        //Check inventory

        const newExpend = new Expend({
            items,
            expendedDate,
            expendedBy,
            reportedBy : user,
            base : finalbase,
            remarks
        });

        await newExpend.save();

        //Decrease from inventory
        
        res.status(200).json({Expend: newExpend});

    }catch(error){
        console.error(error.message);
        return res.status(500).json({message: "Server error in reporting expended assets"});
    }
};

//--view expended assets--
const getExpended = async(req,res)=>{
    try{
        const user = await User.findById(req.userId);

        let expendedAsset;
        if(user.role === 'Admin'){
            expendedAsset = await Expend.find({})
            .populate('items.asset', 'name category')
            .populate('reportedBy', 'role')
            .populate('base', 'name')
        }else{
            expendedAsset = await Expend.find({base: user.base})
            .populate('items.asset', 'name category')
            .populate('base', 'name')
            .populate('reportedBy', 'role') 
        }
        res.status(200).json(expendedAsset);

    }catch(error){
        console.error(error.message);
        return res.status(500).json({message: "Server error in fetching all the expended assets "});

    }
};


module.exports = {expend, getExpended};