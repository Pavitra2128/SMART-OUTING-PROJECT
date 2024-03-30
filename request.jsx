import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faClock, faTimes } from '@fortawesome/free-solid-svg-icons'; // Imported font awesome icons
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function RadioButtonGroup() {
    const [showCheckInClock, setShowCheckInClock] = useState(false);
    const [showCheckOutClock, setShowCheckOutClock] = useState(false);
    const [checkInHour, setCheckInHour] = useState('');
    const [checkInMinute, setCheckInMinute] = useState('');
    const [checkInAmPm, setCheckInAmPm] = useState('');
    const [checkOutHour, setCheckOutHour] = useState('');
    const [checkOutMinute, setCheckOutMinute] = useState('');
    const [checkOutAmPm, setCheckOutAmPm] = useState('');
    const [reason, setReason] = useState('');
    const [selectedCheckInTime, setSelectedCheckInTime] = useState('Not selected');
    const [selectedCheckOutTime, setSelectedCheckOutTime] = useState('Not selected');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [status, setStatus] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const currentDate = new Date();
        const currentHour = currentDate.getHours();
        const currentMinute = currentDate.getMinutes();
        const currentAmPm = currentHour >= 12 ? 'PM' : 'AM';

        setCheckInHour(currentHour % 12 || 12);
        setCheckInMinute(currentMinute);
        setCheckInAmPm(currentAmPm);

        setCheckOutHour(currentHour % 12 || 12);
        setCheckOutMinute(currentMinute);
        setCheckOutAmPm(currentAmPm);
    }, []);

    const handleReasonChange = (event) => {
        setReason(event.target.value);
    };

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    const handleSubmit = async () => {
        // Validate all fields
        if (!selectedCheckInTime || !selectedCheckOutTime || !startDate || !endDate || !reason) {
            alert('Please fill in all fields');
            return;
        }

        const userId = localStorage.getItem('userId');
        if (!userId) {
            console.error('User ID not found in localStorage');
            return;
        }

        const requestData = {
            checkInTime: selectedCheckInTime,
            checkOutTime: selectedCheckOutTime,
            startDate: startDate,
            endDate: endDate,
            reason: reason,
            status: 'pending'
        };

        try {
            const response = await axios.post(`http://localhost:3001/update-details/${userId}`, requestData);
            localStorage.setItem('status', 'pending');

            if (response.status === 200) {
                setStatus('pending');
                navigate('/student/status'); // Navigate to student status on success
            } else {
                console.error('Error updating details:', response.data);
            }
        } catch (error) {
            console.error('Error updating details:', error);
        }
    };

    const handleCheckInButtonClick = () => {
        setShowCheckInClock(!showCheckInClock);
        setShowCheckOutClock(false); // Hide check out clock
    };

    const handleCheckOutButtonClick = () => {
        setShowCheckOutClock(!showCheckOutClock);
        setShowCheckInClock(false); // Hide check in clock
    };

    const handleCheckInTimeChange = () => {
        const time = `${checkInHour}:${checkInMinute} ${checkInAmPm}`;
        setSelectedCheckInTime(time);
        setShowCheckInClock(false); // Hide check in clock after selection
    };

    const handleCheckOutTimeChange = () => {
        const time = `${checkOutHour}:${checkOutMinute} ${checkOutAmPm}`;
        setSelectedCheckOutTime(time);
        setShowCheckOutClock(false); // Hide check out clock after selection
    };

    const handleCloseButtonClick = () => {
        navigate('/');
    };

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center p-0 m-0 vh-100 ">
            <div className='card p-4' style={{ width: '80%', height: '80%' }}>
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h4>Outing Requests</h4>
                    <button className="btn btn-link" onClick={handleCloseButtonClick}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>
                <div className="card-body">
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" id="out-city" name="location" value="out-city" />
                            <label className="form-check-label" htmlFor="out-city">Local</label>
                            <FontAwesomeIcon icon={faCalendarAlt} className="ml-2" /> {/* Calendar icon */}
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" id="local" name="location" value="local" />
                            <label className="form-check-label" htmlFor="local">Out-City</label>
                            <span role="img" aria-label="local-emoji" className="ml-2">&#x1F3E1;</span> {/* Emoji */}
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <DatePicker className="form-control" selected={startDate} onChange={handleStartDateChange} placeholderText="From" />
                            <DatePicker className="form-control ml-2" selected={endDate} onChange={handleEndDateChange} placeholderText="To" />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="d-flex align-items-center">
                            <div className="dropdown mr-2">
                                <button className="btn btn-primary dropdown-toggle" type="button" id="checkInDropdown" onClick={handleCheckInButtonClick}>
                                    {selectedCheckInTime === 'Not selected' ? 'Check-in Time' : selectedCheckInTime}
                                </button>
                                <div className={`dropdown-menu ${showCheckInClock ? 'show' : ''}`} aria-labelledby="checkInDropdown">
                                    <div className="dropdown-item">
                                        <select className="form-control mr-2" value={checkInHour} onChange={(e) => setCheckInHour(e.target.value)}>
                                            <option value="">Hour</option>
                                            {[...Array(12).keys()].map(hour => (
                                                <option key={hour + 1} value={hour + 1}>{hour + 1}</option>
                                            ))}
                                        </select>
                                        <select className="form-control mr-2" value={checkInMinute} onChange={(e) => setCheckInMinute(e.target.value)}>
                                            <option value="">Minute</option>
                                            {[...Array(59).keys()].map(minute => (
                                                <option key={minute + 1} value={minute + 1}>{minute + 1}</option>
                                            ))}
                                        </select>
                                        <select className="form-control" value={checkInAmPm} onChange={(e) => setCheckInAmPm(e.target.value)}>
                                            <option value="AM">AM</option>
                                            <option value="PM">PM</option>
                                        </select>
                                    </div>
                                    <button className="btn btn-primary mt-2" onClick={handleCheckInTimeChange}>Set Check-in Time</button>
                                </div>
                            </div>
                            <div className="dropdown">
                                <button className="btn btn-primary dropdown-toggle" type="button" id="checkOutDropdown" onClick={handleCheckOutButtonClick}>
                                    {selectedCheckOutTime === 'Not selected' ? 'Check-out Time' : selectedCheckOutTime}
                                </button>
                                <div className={`dropdown-menu ${showCheckOutClock ? 'show' : ''}`} aria-labelledby="checkOutDropdown">
                                    <div className="dropdown-item">
                                        <select className="form-control mr-2" value={checkOutHour} onChange={(e) => setCheckOutHour(e.target.value)}>
                                            <option value="">Hour</option>
                                            {[...Array(12).keys()].map(hour => (
                                                <option key={hour + 1} value={hour + 1}>{hour + 1}</option>
                                            ))}
                                        </select>
                                        <select className="form-control mr-2" value={checkOutMinute} onChange={(e) => setCheckOutMinute(e.target.value)}>
                                            <option value="">Minute</option>
                                            {[...Array(59).keys()].map(minute => (
                                                <option key={minute + 1} value={minute + 1}>{minute + 1}</option>
                                            ))}
                                        </select>
                                        <select className="form-control" value={checkOutAmPm} onChange={(e) => setCheckOutAmPm(e.target.value)}>
                                            <option value="AM">AM</option>
                                            <option value="PM">PM</option>
                                        </select>
                                    </div>
                                    <button className="btn btn-primary mt-2" onClick={handleCheckOutTimeChange}>Set Check-out Time</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <textarea
                            placeholder="Type your Reason..."
                            value={reason}
                            onChange={handleReasonChange}
                            className="form-control"
                            rows="4"
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <button onClick={handleSubmit} className="btn btn-primary">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RadioButtonGroup;