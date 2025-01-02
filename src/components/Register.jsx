import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const API_URL = 'http://localhost:5000/register';

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password, role }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Registration successful! Please log in.');
            } else {
                setMessage(data.message || 'Registration failed.');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div className="register-container">
            <h2>Create an Account</h2>
            <form onSubmit={handleSubmit} className="register-form">
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <div>
                    <label>Role:</label>
                    <select value={role} onChange={(e) => setRole(e.target.value)} required>
                        <option value="">Select a role</option>
                        <option value="job_seeker">Job Seeker</option>
                        <option value="recruiter">Recruiter</option>
                    </select>
                </div>
                <button type="submit">Register</button>
                {message && <p className="message">{message}</p>}
            </form>
            <p className="redirect-text">
                Already have an account?{' '}
                <button 
                    className="redirect-button" 
                    onClick={() => navigate('/login')}
                >
                    Login here
                </button>
            </p>
        </div>
    );
};

export default Register;