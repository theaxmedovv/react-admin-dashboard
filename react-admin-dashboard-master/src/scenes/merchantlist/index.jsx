import React, { useState } from 'react';
import { sampleMerchants } from "../../data/mockData";
import './merchantlist.css';

const MerchantList = () => {
  const [merchants, setMerchants] = useState(sampleMerchants);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortColumn, setSortColumn] = useState('name');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const handleSortChange = (column) => {
    setSortColumn(column);
  };

  const filteredMerchants = merchants
    .filter((merchant) => {
      return (
        merchant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        merchant.businessName.toLowerCase().includes(searchTerm.toLowerCase())
      ) && (filterStatus === 'All' || merchant.status === filterStatus);
    })
    .sort((a, b) => {
      if (sortColumn === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortColumn === 'status') {
        return a.status.localeCompare(b.status);
      } else if (sortColumn === 'dateJoined') {
        return new Date(a.dateJoined) - new Date(b.dateJoined);
      } else {
        return 0;
      }
    });

  const handleAction = (action, merchantId) => {
    console.log(action, merchantId);
  };

  return (
    <div className="merchant-list-container">
      <h1>Merchant List Overview</h1>

      <div className="search-filter-bar">
        <input
          type="text"
          placeholder="Search by name or business"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select value={filterStatus} onChange={handleStatusChange}>
          <option value="All">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Pending Approval">Pending Approval</option>
        </select>
        <button onClick={() => handleSortChange('name')}>Sort by Name</button>
        <button onClick={() => handleSortChange('status')}>Sort by Status</button>
        <button onClick={() => handleSortChange('dateJoined')}>Sort by Date Joined</button>
      </div>

      <table className="merchant-table">
        <thead>
          <tr>
            <th>Merchant ID</th>
            <th>Merchant Name</th>
            <th>Business Name</th>
            <th>Status</th>
            <th>Contact Information</th>
            <th>Location</th>
            <th>Date Joined</th>
            <th>Business Type</th>
            <th>Products Listed</th>
            <th>Sales Volume</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredMerchants.map((merchant) => (
            <tr key={merchant.id}>
              <td>{merchant.id}</td>
              <td>{merchant.name}</td>
              <td>{merchant.businessName}</td>
              <td>{merchant.status}</td>
              <td>{merchant.contact}</td>
              <td>{merchant.location}</td>
              <td>{merchant.dateJoined}</td>
              <td>{merchant.businessType}</td>
              <td>{merchant.productsListed}</td>
              <td>{merchant.salesVolume}</td>
              <td>
                <button onClick={() => handleAction('view', merchant.id)}>View</button>
                <button onClick={() => handleAction('edit', merchant.id)}>Edit</button>
                <button onClick={() => handleAction('deactivate', merchant.id)}>Deactivate</button>
                <button onClick={() => handleAction('activate', merchant.id)}>Activate</button>
                <button onClick={() => handleAction('delete', merchant.id)}>Delete</button>
                <button onClick={() => handleAction('message', merchant.id)}>Send Message</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="summary-metrics">
        <h2>Summary and Metrics</h2>
        <p><strong>Total Merchants:</strong> {filteredMerchants.length}</p>
      </div>

      <div className="export-report-bar">
        <button>Export List (CSV)</button>
        <button>Generate Reports</button>
      </div>
    </div>
  );
}

export default MerchantList;
