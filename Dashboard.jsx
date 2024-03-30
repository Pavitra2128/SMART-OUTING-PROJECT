import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglass, faCheckCircle, faExclamationCircle, faTachometerAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Dashboard = () => {
    const [approvedCount, setApprovedCount] = useState(0);
    const [pendingCount, setPendingCount] = useState(0);
  
  const [userData, setUserData] = useState([]);
  

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await axios.get("http://localhost:3001/pending-requests");
      setUserData(result.data);
      setApprovedCount(result.data.filter(user => user.status === 'approved').length);
     setPendingCount(result.data.filter(user => user.status === 'pending').length);
      renderBarGraph();
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    }
  };

  const renderBarGraph = () => {
    const ctx = document.getElementById('barGraph');
    if (ctx) {
      Chart.getChart(ctx)?.destroy();
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'],
          datasets: [{
            label: 'Total Outings',
            data: [10, 20, 15, 10, 22, 20, 6, 8],
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    } else {
      console.error('Element with ID "barGraph" not found.');
    }
  };


  useEffect(() => {
    fetchCounts();
    renderBarGraph();
  }, []);

  const fetchCounts = () => {
    fetch('http://localhost:3001/admin/count/pending')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch pending requests count');
        }
        return response.json();
      })
      .then(data => {
        setPendingCount(data.count);
      })
      .catch(error => {
        console.error('Error fetching pending requests count:', error.message);
      });

    fetch('http://localhost:3001/admin/approved')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch approved requests count');
        }
        return response.json();
      })
      .then(data => {
        setApprovedCount(data.length);
      })
      .catch(error => {
        console.error('Error fetching approved requests count:', error.message);
      });
  };
    return (
        <div>
             <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-1 pb-2 mb-3 border-bottom">
            <h1 className="h3">Dashboard</h1>
          </div>
          <div className="row">
            <div className="col-lg-4">
              <div className="card text-white bg-info mb-3">
                <div className="card-body">
                  <h3 className="card-title"><FontAwesomeIcon icon={faHourglass} /> Pending Requests</h3>
                  <h1 className="card-text">{pendingCount}</h1>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card text-white bg-success mb-3">
                <div className="card-body">
                  <h3 className="card-title"><FontAwesomeIcon icon={faCheckCircle} /> Approved Requests</h3>
                  <h1 className="card-text">{approvedCount}</h1>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card text-white bg-danger mb-3">
                <div className="card-body">
                  <h3 className="card-title"><FontAwesomeIcon icon={faExclamationCircle} /> Delayed Requests</h3>
                  <h1 className="card-text">15</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-10">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Bar Graph</h5>
                  <canvas id="barGraph" width="400" height="130"></canvas>
                </div>
              </div>
            </div>
          </div>
        </main>
        </div>
    );
};

export default Dashboard;