const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName : {
        type:String,
        required: [true, 'is required'],
        trim:true,
        maxLength:[20,'First name cannot be more than 20']
    },
    lastName : {
        type:String,
        required: [true, 'is required'],
        trim:true,
        maxLength:[50,'Last name cannot be more than 50']
    },
    userName : {
        type:String,
        required: [true, 'is required'],
        trim:true,
        maxLength:[50,'username cannot be more than 50']
    },
    password : {
        type:String,
        required: [true, 'is required'],
        trim:true,
        maxLength:[50,'password cannot be more than 50']
    },
    role : {
        type:String,
        required: [true, 'is required']
    },
})

module.exports = mongoose.model('User',userSchema);