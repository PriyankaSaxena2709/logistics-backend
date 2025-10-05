const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Asset name is required'],
        trim: true
    },
    category:{
        type: String,
        enum: ["Weapon", "Vehicle", "Ammunition", "Equipment"],
        required: [true, 'asset category is required']
    },
    unit:{
        type: Number
    },
    quantity:{
        type: Number
    }
})

const Assets = mongoose.model('Assets', assetSchema);

module.exports = Assets;