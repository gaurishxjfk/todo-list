const jwt = require('jsonwebtoken')
const Task = require('../models/taskModels')
const User = require('../models/userModels')
const CustomAPIError = require('../errors/custom-error');

const getAllTasks = async (req,res) => {
    const { id: userID} = req.params;
    try {
        const tasks = await Task.find({ userID: userID})
        res.status(200).json({tasks})
    } catch (error) {
        res.status(500).json({msg :'No tasks added'})
    }
}

const addTask = async (req,res) => {
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

const addUser = async (req,res) => {
    try {
        const user = await User.create(req.body)
        res.status(201).json({user})
    } catch (error) {
        res.status(500).json({msg :'some error occured'})
    }
}

const getAllUsers = async (req,res) => {
    try {
        const user = await User.find({})
        res.status(200).json({user})
    } catch (error) {
        res.status(500).json({msg :'No tasks added'})
    }
}

const login = async (req,res) => {

    const {username,password} = req.body;
    if(!username || !password){
      return CustomAPIError('pleascee',400)
    }
    const token = jwt.sign({username},process.env.JWT_SECRET,{expiresIn:'30d'})

    res.status(200).json({msg:'userCreated',token})
}

const getUser = async (req,res) => {
    try {
        const { id: userID} = req.params;
        
        const user = await User.findOne({userName:userID})

        if(!user){
            return res.status(404).json({msg:`No USER with id ${userID}`})
        }
        res.status(200).json({user})
    } catch (error) {
        res.status(500).json({msg :'some error occured'})
    }
}

module.exports = {
    getAllTasks,
    addTask,
    getSingleTask,
    deleteTask,
    updateTask,
    addUser,
    getAllUsers,
    login,
    getUser };