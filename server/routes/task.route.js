const express = require("express");
const router = express.Router();
const { getTasks, getTask, newTask, editTask, deleteTask } = require("../controllers/task.controller");
const fetchUser = require("../middlewares/fetchUser");

router.get('/', fetchUser, getTasks);
router.get('/:id', fetchUser, getTask);
router.post('/', fetchUser, newTask);
router.put('/:id', fetchUser, editTask);
router.delete('/:id', fetchUser, deleteTask);


module.exports = router; 
