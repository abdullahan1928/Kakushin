import { useEffect, useState } from 'react';
import './Dashboard.css';
import { getTasks, deleteTask } from '../../services/task.service';
import { ITask } from '../../interfaces/task.interface';
import { getUser } from '../../services/auth.service';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getUser().then((data) => {
            setUsername(data.name)
        }).catch(error => {
            console.error('Error getting user:', error);
        })
    }, []);

    useEffect(() => {
        const authToken = localStorage.getItem("token");
        getTasks(authToken).then((data) => {
            setTasks(data);
            setLoading(false);
        });
    }, []);

    const handleDelete = async (taskId: string | undefined) => {
        try {
            if (!taskId) return;
            const authToken = localStorage.getItem("token");
            await deleteTask(authToken, taskId);
            setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <div className="dashboard-container">
            <header>
                <h1>Hi {username}</h1>
                <button className="new-task-button" onClick={() => navigate('/dashboard/new')}>New Task</button>
            </header>
            <div className="tasks-container">
                {loading ? (
                    <p>Loading tasks...</p>
                ) : tasks.length === 0 ? (
                    <p>No tasks available. Please create a new task.</p>
                ) : (
                    tasks.map(task => (
                        <div className="task-card" key={task._id}>
                            <h2>{task.title}</h2>
                            <p>{task.description}</p>
                            <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
                            <p>Status: {task.status.charAt(0).toUpperCase() + task.status.slice(1).replace('-', ' ')}</p>
                            <p>Priority: {task.priority}</p>
                            <div className="task-actions">
                                <button
                                    className="edit-button"
                                    onClick={() => navigate(`/dashboard/edit/${task._id}`)}
                                >Edit</button>
                                <button className="delete-button" onClick={() => handleDelete(task._id)}>Delete</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Dashboard;
