const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true, },
    description: { type: String, required: true, },
    dueDate: { type: Date, required: true, },
    status: {
        type: String,
        required: true, 
        enum: ['pending', 'in-progress', 'completed'],
    },
    priority: {
        type: String,
        required: true,
        enum: ['low', 'medium', 'high'],
    },
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;