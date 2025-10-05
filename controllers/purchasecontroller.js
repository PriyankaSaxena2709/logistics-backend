const Purchase = require("../models/purchase");
const User = require("../models/user");
const Asset = require("../models/assets");


//---new purchase creation---
const purchase = async(req,res)=>{
    try{
        const{items, remarks, purchaseDate} = req.body;
        const userRole = req.role;
        if(!items || items.length === 0){
            return res.status(400).json({message: "Purchase must have atleat one item"});
        }
        const userID = req.userId;
        const user = await User.findById(userID);

        let finalBase;

        if(userRole === 'Admin'){
            const {base} = req.body;
            if(!base){
                return res.status(400).json({message: "Admin must specify base for the purchase"});
            }
            finalBase = base;
        }else{
            finalBase = user.base;
        }
        //---Total Cost---
        let totalCost = 0;
        for(let i = 0; i<items.length; i++){
            const assetDoc = await Asset.findById(items[i].asset);
            if(!assetDoc){
                return res.status(400).json({message: "Asset id is not found"})
            }
            totalCost = totalCost + items[i].quantity * items[i].unitPrice;
        }

        const newPurchase = new Purchase({
            items,
            base: finalBase,
            purchasedBy: userID,
            remarks,
            purchaseDate,
            Cost: totalCost
        });

        await newPurchase.save();

        //---Update the asset stock---
        const updateAsset = items.map(item=>
            Asset.findByIdAndUpdate(item.asset,{$inc:{quantity: item.quantity}})
        );
        await Promise.all(updateAsset);

        res.status(201).json({message: "Purchase recorded successfully", purchase: newPurchase});
        
    }catch(error){
        console.error(error.message);
        return res.status(500).json({message: "Server error in purchasing the item"})

    }
};

//---view all purchases---
const getAllPurchases = async(req,res)=>{
    try{
        const userid = req.userID;
        const user = await User.findById(userid);
        let purchases;
        if(user.role == 'Admin'){
             purchases = await Purchase.find({})
             .populate('base', 'name')
             .populate('purchasedBy', 'role')
             .populate('items.asset', 'name category');
             
        }else{
             purchases = await Purchase.find({base: user.base})
             .populate('base', 'name')
             .populate('items.asset', 'name category');
        }
        res.status(200).json(purchases);
    }catch(error){
        console.error(error.message);
        res.status(500).json({msg: "Server error in fetching all purchases"});
    }
};

module.exports = {purchase, getAllPurchases};