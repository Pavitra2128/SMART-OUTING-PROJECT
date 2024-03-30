import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

const Status = () => {
    const navigate = useNavigate();
    const [dateData, setDateData] = useState(null);
    const [status, setStatus] = useState(false);
    const [status2, setStatus2] = useState(false);
    const [buttonClicked, setButtonClicked] = useState(false);
    const [requestRejected, setRequestRejected] = useState(false); // Define requestRejected state

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = localStorage.getItem('userId');
                const response = await axios.get(`http://localhost:3001/date-details/${userId}`);
                setDateData(response.data);
                const statusResponse = await axios.get(`http://localhost:3001/status/${userId}`);
                setStatus(statusResponse.data.status === 'approved');
                setStatus2(statusResponse.data.status2 === 'approved');
                if (statusResponse.data.status === 'rejected' || statusResponse.data.status2 === 'rejected') {
                    setRequestRejected(true);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        const day = date.toLocaleString('en-us', { weekday: 'long' });
        return `${date.toDateString()}, ${day}`;
    };

    const handleCreateRequest = () => {
        if (status === null) {
            navigate('/student');
        } else {
            setButtonClicked(true);
        }
    };

    const handleCancel = async () => {
        const userId = localStorage.getItem('userId');
        const statusData = {
            status: 'cancelled'
        };
        try {
            await axios.post(`http://localhost:3001/update-status/${userId}`, statusData);
            localStorage.setItem('status', 'cancelled');
            navigate('/');
        } catch (error) {
            console.error('Error cancelling request:', error);
        }
    };

    const handleCheckout = async () => {
        const userId = localStorage.getItem('userId');
        const statusData = {
            status2: 'in-outing'
        };
        try {
            await axios.post(`http://localhost:3001/update-status2/${userId}`, statusData);
            localStorage.setItem('status', 'in-outing');
            setStatus2(true); // Update status2 state locally
            navigate('/');
        } catch (error) {
            console.error('Error updating status2:', error);
        }
    };
    
    const Instructions = () => {
        return (
            <div className="bg-light p-4 rounded mt-4">
                <h2 className="text-primary">Instructions</h2>
                <p>Checkout is permitted starting one hour before the requested time.</p>
                <p><strong>Outing types:</strong></p>
                <ul>
                    <li><strong>Out-city:</strong><br />More than 1 day when traveling out of the city.</li>
                    <li><strong>Local:</strong><br />Single day outing (Within city 9AM - 6PM).</li>
                    <li><strong>Temporary Day Scholar:</strong><br />Temporarily become a day scholar for some days.</li>
                    <li><strong>Official:</strong><br />Campus admin will declare it and you can apply for it when available.</li>
                </ul>
            </div>
        );
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6">
                    {status !== null && !buttonClicked ? (
                        <button type="button" onClick={handleCreateRequest} className="btn btn-primary btn-lg mb-3">
                            <FontAwesomeIcon icon={faPlusCircle} className="mr-2" />
                            Create Request
                        </button>
                    ) : null}
                    {buttonClicked ? (
                        <p className="text-danger">You Already Have a pending request!</p>
                    ) : null}
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="card mb-4">
                        <div className="card-body">
                            <h5 className="card-title">From Date</h5>
                            <p className="card-text">{dateData && formatDate(dateData.from_date)}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card mb-4">
                        <div className="card-body">
                            <h5 className="card-title">To Date</h5>
                            <p className="card-text">{dateData && formatDate(dateData.to_date)}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="form-check mb-4">
                <input type="checkbox" id="submitted" className="form-check-input" checked={dateData !== null} readOnly />
                <label htmlFor="submitted" className="form-check-label">Submitted</label>
                <hr className="dotted-line" />
            </div>
            <div className="form-check mb-4">
                <input type="checkbox" id="status" className="form-check-input" checked={status} readOnly />
                <label htmlFor="status" className="form-check-label">Accepted By HOD</label>
                {requestRejected && status === false && (
                    <p className="text-danger">Request Rejected</p>
                )}
                <hr className="dotted-line" />
            </div>
            <div className="form-check mb-4">
                <input type="checkbox" id="status2" className="form-check-input" checked={status2} readOnly />
                <label htmlFor="status2" className="form-check-label">Issued By Warden</label>
                {requestRejected && status2 === false && (
                    <p className="text-danger">Request Rejected</p>
                )}
            </div>
            {status && status2 && (
                <div className="d-flex justify-contentr mb-4">
                    <button type="button" className="btn btn-success mr-3" onClick={handleCheckout}>Checkout</button>
                </div>
            )}
            <hr className="dotted-line" />
            <Instructions />
            <div className="d-flex justify-content-center">
                <button type='button' onClick={handleCancel} className='btn btn-danger btn-lg mb-4'>
                    Cancel Request
                </button>
            </div>
        </div>
    );
};

export default Status;
