const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    taskName : {
        type:String,
        required: [true, 'is required'],
        trim:true,
        maxLength:[15,'Task name should be less than 15']
    },
    taskDesc : {
        type:String,
        required: [true, 'is required'],
        trim:true,
        maxLength:[50,'description should be less than 50']
    },
    taskDate : {
        type:Date,
        required: [true, 'is required'],
        min: '1987-09-28',
        max: '2030-05-23'
    },
    isDone : {
        type:Boolean,
        default:false
    },
    userID : {
        type:String,
        required: [true, 'user id is required'],
    },
})

module.exports = mongoose.model('Task',taskSchema);