const Assign = require("../models/assign");
const User = require("../models/user");

//---assigning assets---
const assign = async(req,res)=>{
    try{
        const{personnel, items, remarks, assignmentDate} = req.body;
        const user = await User.findById(req.userId);

        let commanderBase;
        if(user.role === 'Admin'){
            const{base} = req.body;
            if(!base){
                return res.status(400).json({message: "Base should be selected by admin"});
            }
            commanderBase = base;
        }else{
            commanderBase = user.base;
        }

        const newAssignment = new Assign({
            personnel,
            items,
            base : commanderBase,
            remarks,
            assignmentDate
        });
        await newAssignment.save()
        res.status(201).json({message: "Assets assigned succeessfully"});
    }catch(error){
        console.error(error.message);
        return res.status(500).json({message: "Server error in assigning the assets"});
    }
};

//---view assigned assets--

const getAssignedAssets = async (req,res)=>{
    try{
        const user = await User.findById(req.userId);
        let assignment;
        if(user.role === 'Admin'){
            assignment = await Assign.find({})
            .populate('base', 'name')
            .populate('items.asset', 'name')
            .populate('assignedBy', 'name role');
        }else{
            assignment = await Assign.find({base: user.base})
            .populate('base', 'name')
            .populate('items.asset', 'name')
            .populate('assignedBy', 'name role');
        }
        res.status(200).json(assignment);
    }catch(error){
        console.error(error.message);
        return res.status(500).json({message: "Server error in fetching assigned assets"});
    }
};

module.exports = {assign, getAssignedAssets};