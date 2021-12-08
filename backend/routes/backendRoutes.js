const express = require('express');
const router = express.Router();
const {getAllTasks,
    addTask,
    getSingleTask,
    deleteTask,
    updateTask,
    addUser,
    getAllUsers,
    login,getUser } = require('../controller/backendControllers');
const {authMiddleWare} = require('../middleware/auth')

router.route('/tasks/:id').get(getAllTasks);
router.post('/tasks/',addTask);
router.get('/tasks/task/:id',getSingleTask);
router.delete('/tasks/:id',deleteTask);
router.patch('/tasks/:id',updateTask);

router.post('/user',addUser);
router.get('/user/',getAllUsers);
router.get('/user/:id',getUser);

router.route('/login').post(login);

module.exports = router;