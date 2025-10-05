const Transfer = require("../models/transfer");
const User = require("../models/user");



//---create new transfer---
const transfer = async (req,res)=>{
    try{
        const {items, tobase, remarks, transferDate} = req.body;
        const user = await User.findById(req.userId);

        let transferbase; 
        if(user.role === 'Admin'){
            const {frombase} = req.body;
            if(!frombase){
                return res.status(400).json({message: "Admin must specify base "});
            }
            transferbase = frombase;
        }else{
            transferbase = user.base;
        }

        //---Check inventory---

        const newTransfer = new Transfer({
            items,
            frombase : transferbase,
            tobase,
            transferedBy : user._id,
            transferDate,
            status: 'In Transit'
        });
        await newTransfer.save();

        //---Delete quantity from the original base---


        res.status(201).json({message: "Transfer initated successfully", transfer: newTransfer});

    }catch(error){
        console.error(error.message);
        return res.status(500).json({message: "Server error in transfering"});
    }
};

//---Get all transfers---

const getTransfers = async (req,res)=>{
    try{
        const user = await User.findById(req.userId);

        let transfers;
        if(user.role === 'Admin'){
            transfers = await Transfer.find({})
            .populate('frombase', 'name')
            .populate('tobase', 'name')
            .populate('transferedBy', 'name role')
            .populate('items.asset', 'name category');
        }else{
            transfers = await User.Transfer.find({frombase : user.base})
            .populate('tobase', 'name')
            .populate('transferedBy', 'name')
            .populate('items.asset', 'name category');
        }
        res.status(200).json(transfers);

    }catch(error){
        console.error(error.message);
        return res.status(500).json({message: "Server error in fetching transfers"});
    }
}

module.exports = {transfer, getTransfers};