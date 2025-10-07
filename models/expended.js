const mongoose = require("mongoose");

const expandedItemSchema = new mongoose.Schema({
    asset: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Asset',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
},{_id:false});

const expandedSchema = new mongoose.Schema({
    items : [expandedItemSchema],

    reportedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    expandedBy: {
        type: String,
        trim: true
    },

    expandedDate: {
        type: Date,
        default: Date.now
    },

    remarks: {
        type: String
    },
    base: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Base',
    }

});

const Expend = mongoose.model('Expend', expandedSchema);
module.exports = Expend;