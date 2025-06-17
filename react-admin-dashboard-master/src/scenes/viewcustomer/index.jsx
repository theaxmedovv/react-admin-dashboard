import React from 'react';
import './viewcustomer.css';

const ViewCustomer = ({ customer }) => {
    const closeAccount = () => {
        alert('Account closed');
        // Add more functionality here
    };

    const exportData = () => {
        alert('Data exported');
        // Add more functionality here
    };

    const deleteAccount = () => {
        const confirmation = window.confirm('Are you sure you want to delete this account? This action cannot be undone.');
        if (confirmation) {
            alert('Account deleted');
            // Add more functionality here
        }
    };

    const sendEmail = (type) => {
        alert(`Sending ${type} email`);
        // Add more functionality here
    };

    return (
        <div className="view-customer">
            <div className="customer-details">
                <div className="customer-card">
                    <img src={customer.image} alt={customer.name} className="customer-image" />
                    <h2 className="customer-name">{customer.name}</h2>
                    <p className="customer-position">{customer.position}</p>
                    <div className="customer-info">
                        <p><i className="fas fa-envelope"></i> <strong>Email:</strong> {customer.email}</p>
                        <p className="status"><i className="fas fa-check-circle"></i> {customer.emailStatus}</p>
                        <p><i className="fas fa-phone"></i> <strong>Phone:</strong> {customer.phone}</p>
                        <p><i className="fas fa-globe"></i> <strong>Country:</strong> {customer.country}</p>
                        <p><i className="fas fa-map-marker-alt"></i> <strong>State/Province:</strong> {customer.state}</p>
                        <p><i className="fas fa-home"></i> <strong>Address 1:</strong> {customer.address1}</p>
                        <p><i className="fas fa-home"></i> <strong>Address 2:</strong> {customer.address2}</p>
                    </div>
                    <div className="customer-actions">
                        <button><i className="fas fa-key"></i> Reset Password</button>
                        <button><i className="fas fa-sign-in-alt"></i> Log In as Customer</button>
                    </div>
                </div>

                <div className="billing-info">
                    <h3><i className="fas fa-credit-card"></i> Billing Information</h3>
                    <p><strong>Credit Card:</strong> {customer.creditCard}</p>
                    <p><strong>Paid:</strong> {customer.paid}</p>
                    <p><strong>Draft:</strong> {customer.draft}</p>
                    <p><strong>Unpaid/Overdue:</strong> {customer.unpaid}</p>
                    <p><strong>Refunded:</strong> {customer.refunded}</p>
                    <p><strong>Gross Income:</strong> {customer.grossIncome}</p>
                    <div className="billing-actions">
                        <button><i className="fas fa-file-invoice"></i> Create Invoice</button>
                        <button><i className="fas fa-envelope"></i> Resend Overdue Invoices</button>
                    </div>
                </div>

                <div className="email-send">
                    <h3><i className="fas fa-paper-plane"></i> Send Email</h3>
                    <select onChange={(e) => sendEmail(e.target.value)} defaultValue="">
                        <option value="Last Invoice">Resend Last Invoice</option>
                        <option value="Password Reset">Send Password Reset Email</option>
                        <option value="Verification">Send Verification Email</option>
                    </select>
                    <button onClick={() => sendEmail('Last Invoice')}><i className="fas fa-envelope"></i> Send Email</button>
                    <p>{customer.orderHistory1}</p>
                    <p>{customer.orderHistory2}</p>
                </div>
            </div>
            <div className="other-actions">
                <h3><i className="fas fa-cogs"></i> Other Actions</h3>
                <button className="close-account" onClick={closeAccount}><i className="fas fa-user-times"></i> Close Account</button>
                <button className="export-data" onClick={exportData}><i className="fas fa-file-export"></i> Export Data</button>
                <button className="delete-account" onClick={deleteAccount}><i className="fas fa-trash"></i> Delete Account</button>
                <p className="warning">Once you delete the account, data will be lost forever.</p>
            </div>
        </div>
    );
};

export default ViewCustomer;
