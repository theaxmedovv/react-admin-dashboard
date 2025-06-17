import React, { useState } from 'react';
import './verification.css'; // Import custom CSS
import { verificationRequests, verificationHistory } from "../../data/mockData";

const Verifications = () => {
  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleRequestDetails = (request) => {
    setSelectedRequest(request);
  };

  const handleApprove = () => {
    // Handle approve action
    console.log('Approved:', selectedRequest);
  };

  const handleReject = () => {
    // Handle reject action
    console.log('Rejected:', selectedRequest);
  };

  const handleRequestDocuments = () => {
    // Handle request additional documents
    console.log('Request additional documents:', selectedRequest);
  };

  return (
    <div className="verification-container">
      <div className="verification-section">
        <div className="card requests-card">
          <div className="card-header">
            <h4>Verification Requests</h4>
          </div>
          <div className="card-body">
            <table className="table requests-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Verification Type</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {verificationRequests.map(request => (
                  <tr key={request.id}>
                    <td>{request.id}</td>
                    <td>{request.fullName}</td>
                    <td>{request.email}</td>
                    <td>{request.verificationType}</td>
                    <td><span className={`status-badge ${request.status.toLowerCase()}`}>{request.status}</span></td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleRequestDetails(request)}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="verification-details">
        {selectedRequest && (
          <div className="card details-card">
            <div className="card-header">
              <h4>Verification Details</h4>
            </div>
            <div className="card-body">
              <p><strong>Full Name:</strong> {selectedRequest.fullName}</p>
              <p><strong>Email:</strong> {selectedRequest.email}</p>
              <p><strong>Verification Type:</strong> {selectedRequest.verificationType}</p>
              <p><strong>Status:</strong> {selectedRequest.status}</p>
              <div className="action-buttons">
                <button className="btn btn-success" onClick={handleApprove}>
                  Approve
                </button>
                <button className="btn btn-danger" onClick={handleReject}>
                  Reject
                </button>
                <button className="btn btn-warning" onClick={handleRequestDocuments}>
                  Request Documents
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="verification-history">
        <div className="card history-card">
          <div className="card-header">
            <h4>Verification History</h4>
          </div>
          <div className="card-body">
            <table className="table history-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Full Name</th>
                  <th>Verification Type</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {verificationHistory.map(history => (
                  <tr key={history.id}>
                    <td>{history.id}</td>
                    <td>{history.fullName}</td>
                    <td>{history.verificationType}</td>
                    <td><span className={`status-badge ${history.status.toLowerCase()}`}>{history.status}</span></td>
                    <td>{history.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verifications;
