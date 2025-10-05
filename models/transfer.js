const mongoose = require("mongoose");

const transferItemSchema = new mongoose.Schema({
    asset:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assets',
        required: true
    },
    quantity:{
        type: Number,
        required: true
    }
},{_id: false});

const transferSchema = new mongoose.Schema({
    items: [transferItemSchema],
    frombase: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Base',
        required: true
    },
    tobase: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Base',
        required: true
    },
    transferedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    transferDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['In Transit', 'Completed', 'Cancelled'],
        default: 'In Transit'
    },
    remarks: {
        type: String,
        trim: true
    }

});

const Transfer = mongoose.model('Transfer', transferSchema);
module.exports = Transfer;