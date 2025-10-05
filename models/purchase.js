const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    asset:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assets',
        required: true
    },
    quantity:{
        type: Number,
        required: true,
        min: [1, 'Alteast 1 item be selected']
    },
    unitPrice:{
        type: Number,
        default: 0
    }
},{_id:false});

const purchaseSchema = new mongoose.Schema({
    items: [itemSchema],
    base: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Base',
        required: true
    },
    purchasedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    purchaseDate: {
        type: Date,
        default: Date.now
    },
    remarks:{
        type: String,
        trim: true
    },
    Cost: {
        type: Number
    }
});

const Purchases = mongoose.model('Purchases', purchaseSchema);

module.exports = Purchases;