const mongoose = require("mongoose");

const baseSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, 'Base name is required'],
        unique: true,
        trim: true
    },
    state:{
        type: String,
        required: [true, 'State is required'],
        trim: true
    },
    
});

const Base = mongoose.model('Base', baseSchema);
module.exports = Base;