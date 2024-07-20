import { useState } from 'react';
import './NewTask.css';
import { createTask } from '../../services/task.service';
import { useNavigate } from 'react-router-dom';

const NewTask = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [status, setStatus] = useState('pending');
    const [priority, setPriority] = useState('low');
    const navigate = useNavigate();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const newTask = { title, description, dueDate, status, priority };
        createTask(newTask);
        navigate('/dashboard');
        setTitle('');
        setDescription('');
        setDueDate('');
        setStatus('pending');
        setPriority('low');
    };

    return (
        <div className="new-task-page">
            <form className="new-task-form" onSubmit={handleSubmit}>
                <h2>Create New Task</h2>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="dueDate">Due Date</label>
                    <input
                        type="date"
                        id="dueDate"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        required
                    >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="priority">Priority</label>
                    <select
                        id="priority"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        required
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
                <button type="submit" className="submit-button">Create Task</button>
            </form>
        </div>
    );
};

export default NewTask;
