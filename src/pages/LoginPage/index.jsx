import { useState } from 'react';
import './styles.scss';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/');
    };

    return (
        <div className='login-page'>
            <form onSubmit={handleSubmit} className='signin-container'>
                <div className='field'>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className='field'>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className='actions'>
                    <button className='button outline'>Anonymous</button>
                    <button className='button solid'>Sign In</button>
                </div>
            </form>
        </div>
    );
}