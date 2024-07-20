const Task = require('../models/task.model');

// Controller for getting all tasks
const getTasks = async (req, res) => {
    try {
        const userId = req.user;
        const tasks = await Task.find({ user: userId });
        res.json(tasks);
    } catch (e) {
        console.log(e);
        res.status(500).send("Some error has occurred");
    }
}

// Controller for getting a single task
const getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        res.json(task);
    } catch (e) {
        console.log(e);
        res.status(500).send("Some error has occurred");
    }
}

// Controller for creating a new task
const newTask = async (req, res) => {
    try {
        const userId = req.user;
        req.body.user = userId;
        const task = new Task(req.body);
        task.save();
        res.json(task);
    } catch (e) {
        console.log(e);
        res.status(500).send("Some error has occurred");
    }
}

// Controller for editing a task
const editTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(task);
    } catch (e) {
        console.log(e);
        res.status(500).send("Some error has occurred");
    }
}

// Controller for deleting a task
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        res.json(task);
    } catch (e) {
        console.log(e);
        res.status(500).send("Some error has occurred");
    }
}

module.exports = {
    getTasks,
    getTask,
    newTask,
    editTask,
    deleteTask,
};