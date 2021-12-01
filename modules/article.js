const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: {
        type:String,
        require: true
    },
    description: {
        type:String,
        
    },
    createdAt: {
        type:Date,
        default:  Date.now
        
    },
})