const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },

    password:{
        type: String,
        min: 6,
        max: 64,
    unique: true
    },

    picture:{
        type: String,
        default: ""
    },

    role:{
        type: [String],
        default: "Subscriber",
        enum: ["Subscriber", "Instructor", "Admin"]
    },

    stripe_account_id: "",
    stripe_Seller: {},
    stripe_Session: {}
},
    {timestamps: true}
);

module.exports = mongoose.model("User", userSchema)
