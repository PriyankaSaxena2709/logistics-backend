const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    role:{
        type: String,
        enum:["Admin" , "Base Commander", "Logistic Officer"],
        default: 'Admin',
        required: true,
    },
    base:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Base',
        default: null,
    },
    password:{
        type: String,
        required: true
    }

})

const User = mongoose.model('User', UserSchema);

module.exports = User;