const Task = require('../models/taskModels')

const getAllTasks = async (req,res) => {
    try {
        const tasks = await Task.find({})
        res.status(200).json({tasks})
    } catch (error) {
        res.status(500).json({msg :'No tasks added'})
    }
}

const addTask = async (req,res) => {
    console.log(req.body)
    try {
        const task = await Task.create(req.body)
        res.status(201).json({task})
    } catch (error) {
        res.status(500).json({msg :'some error occured'})
    }
}

const getSingleTask = async (req,res) => {
    try {
        const { id: taskID} = req.params;
        const task = await Task.findOne({_id:taskID})

        if(!task){
            return res.status(404).json({msg:`No Task with id ${taskID}`})
        }
        res.status(200).json({task})
    } catch (error) {
        res.status(500).json({msg :'some error occured'})
    }
}

const deleteTask = async (req,res) => {
    try {
        const { id: taskID} = req.params;
        const task = await Task.findOneAndDelete({_id:taskID})
        
        if(!task){
            return res.status(404).json({msg:`No Task with id ${taskID}`})
        }
        res.status(200).json({msg : 'Task Deleted'})
    } catch (error) {
        res.status(500).json({msg :'some error occured'})
    }
}

const updateTask = async (req,res) => {
    try {
        const{id:taskID} = req.params;
        const task = await Task.findOneAndUpdate({_id:taskID},req.body,{
            new: true,
            runValidators: true
        })
        if(!task){  
            return res.status(404).json({msg:`No Task with id ${taskID}`})
        }
        res.status(200).json({task})
    } catch (error) {
        res.status(500).json({msg :'some error occured'})
    }
}

module.exports = {
    getAllTasks,
    addTask,
    getSingleTask,
    deleteTask,
    updateTask};