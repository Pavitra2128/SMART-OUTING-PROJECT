import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            let response;
            // Check if email and password are for admin directly
            if (email === 'pavitra2128@gmail.com' && password === '1234') {
                response = { data: { success: true, role: 'admin' } };
            } else {
                // Proceed with database check for other users
                response = await axios.post('http://localhost:3001/login', { email, password });
            }

            if (response.data.success) {
                localStorage.setItem('userId', response.data.id);
                localStorage.setItem('role', response.data.role); 
                localStorage.setItem('login', true);
                navigate(`/${response.data.role}`); 
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed. Please try again later.');
        }
    };

    return (
        <div className='container-fluid d-flex justify-content-center align-items-center vh-100'>
            <div className='card p-4' style={{ width: '800px', height: 'fit-content' }}>
                <div className='row'>
                    <div className='col-md-6'>
                        <div className='text-left'>
                            <h1 className='mb-4' style={{ fontSize: '3rem' }}>Welcome to Smart Campus 📚</h1>
                            <p className="lead">Your dashboard for managing campus activities.</p>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className='text-center'>
                            <h2 className='mb-4'><FontAwesomeIcon icon={faUser} /> Login</h2>
                            <form onSubmit={handleSubmit} className='p-5 bg-light rounded'>
                                <div className='mb-3'>
                                    <label htmlFor="email" className='form-label visually-hidden'><FontAwesomeIcon icon={faEnvelope} /> Email</label>
                                    <div className='input-group'>
                                        <span className='input-group-text'><FontAwesomeIcon icon={faEnvelope} /></span>
                                        <input type="email" placeholder="Enter Email" className='form-control'
                                            onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                </div>
                                <div className='mb-3'>
                                    <div className='input-group'>
                                        <span className='input-group-text'><FontAwesomeIcon icon={faLock} /></span>
                                        <input type="password" placeholder="Enter Password" className='form-control'
                                            onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                </div>
                                <button type='submit' className='btn btn-primary w-100'><strong>Login</strong></button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
