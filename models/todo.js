const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, "This is required"]
    },
    description: {
        type: String,
        required: [true, "This is required"]
    },
    timestamp: {
        type: Date,
        default : Date.now,
        // required: [true, "This is required"]
    }
});

module.exports = mongoose.model("Todo", todoSchema);