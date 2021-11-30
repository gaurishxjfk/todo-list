const express = require('express');
const router = express.Router();
const {getAllTasks,
    addTask,
    getSingleTask,
    deleteTask,
    updateTask } = require('../controller/backendControllers')

router.get('/',getAllTasks);

router.post('/',addTask);

router.get('/:id',getSingleTask);

router.delete('/:id',deleteTask);

router.patch('/:id',updateTask);

module.exports = router;