const mongoose = require("mongoose");

const assignItemSchema = new mongoose.Schema({
    asset: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Asset',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
},{_id : false});

const assignSchema = new mongoose.Schema({
    items: [assignItemSchema],
    personnel: {
        type: String,
        trim : true
    },
    assignmentDate:{
        type: Date,
        default: Date.now
    },
    remarks: {
        type: String,
    },
    base: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Base',
    },
    assignedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Assign = mongoose.model('Assign', assignSchema);
module.exports = Assign;