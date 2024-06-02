// frontend/src/App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CustomerDetails.css'; // Import the CSS file

function CustomerDetails() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios.get('/api/customers')
      .then(res => setCustomers(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container">
      <h1>Customers</h1>
      <ul>
        {customers.map(customer => (
          <li key={customer._id}>
            <h2>{customer.name}</h2>
            <p>Email: {customer.email}</p>
            <p>Mobile: {customer.mobile}</p>
            <p>Date of Birth: {new Date(customer.dob).toDateString()}</p>
            <h3>Last Three Bills</h3>
            <table>
              <thead>
                <tr>
                  <th>Bill No</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Payment Method</th>
                </tr>
              </thead>
              <tbody>
                {customer.bills.slice(0, 3).map(bill => (
                  <tr key={bill._id}>
                    <td>{bill.billNo}</td>
                    <td>{new Date(bill.date).toDateString()}</td>
                    <td>{bill.amount}</td>
                    <td>{bill.paymentMethod}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CustomerDetails;
