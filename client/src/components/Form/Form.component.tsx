import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Form.css';
import { useAuth } from '../../hooks/useAuth';
import { loginUser, signUpUser } from '../../services/auth.service';

const Form = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleTabSwitch = (type: string) => {
        setIsLogin(type === 'login');
        setError(null);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        const formData = new FormData(e.currentTarget);
        const data: any = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        try {
            if (isLogin) {
                const response = await loginUser(data);

                if (response.errors) {
                    setError(response.errors[0].msg);
                    return;
                }
                login(response.data);
                navigate('/dashboard');
            } else {
                const response = await signUpUser(data);

                if (response.errors) {
                    setError(response.errors[0]);
                    return;
                }
                login(response.data);
                navigate('/dashboard');
            }
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred. Please try again.');
        }
    };

    return (
        <div className="form-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <div className="auth-type">
                    <button
                        type="button"
                        onClick={() => handleTabSwitch('signup')}
                        className={!isLogin ? 'active' : ''}
                    >
                        Sign Up
                    </button>
                    <button
                        type="button"
                        onClick={() => handleTabSwitch('login')}
                        className={isLogin ? 'active' : ''}
                    >
                        Log In
                    </button>
                </div>

                <div className='form-items'>
                    <img src="https://kakushin.io/images/logo.png" alt="logo" className="logo" />

                    {isLogin ? (
                        <>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" name="password" required />
                            </div>

                            {error && <div className="error-message">{error}</div>} {/* Show error message if exists */}

                            <button type="submit">Login</button>
                        </>
                    ) : (
                        <>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" id="name" name="name" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" name="password" required />
                            </div>

                            {error && <div className="error-message">{error}</div>} {/* Show error message if exists */}

                            <button type="submit">Sign Up</button>
                        </>
                    )}
                </div>
            </form>
        </div>
    );
};

export default Form;
