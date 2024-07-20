import { useEffect, useState } from 'react';
import './EditTask.css';
import { getTask, updateTask } from '../../services/task.service';
import { useNavigate, useParams } from 'react-router-dom';

const EditTask = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [status, setStatus] = useState('pending');
    const [priority, setPriority] = useState('low');
    const navigate = useNavigate();

    // get id from params
    const { id } = useParams();

    useEffect(() => {
        if (!id) return;
        
        getTask(id).then((data) => {
            console.log(data);
            const formattedDueDate = new Date(data.dueDate).toISOString().split('T')[0];
            setTitle(data.title);
            setDescription(data.description);
            setDueDate(formattedDueDate);
            setStatus(data.status);
            setPriority(data.priority);
        });
    }, [id]);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const newTask = { title, description, dueDate, status, priority };

        if (!id) return;

        updateTask(id, newTask);
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

export default EditTask;
