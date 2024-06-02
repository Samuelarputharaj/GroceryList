import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Customers.css';

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({ mobile: '', name: '', since: new Date() });
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    axios.get('http://localhost:5000/customers')
      .then(response => setCustomers(response.data))
      .catch(error => console.error('There was an error!', error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer({ ...newCustomer, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/customers', newCustomer)
      .then(response => {
        console.log('Customer added:', response.data);
        fetchCustomers(); // Update the list of customers after adding a new one
        setNewCustomer({ mobile: '', name: '', since: new Date() }); // Clear the form fields
      })
      .catch(error => console.error('There was an error!', error));
  };

  return (
    <div className="App">
      <h1>Customers</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="mobile">Mobile:</label>
        <input type="text" id="mobile" name="mobile" value={newCustomer.mobile} onChange={handleInputChange} required />
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={newCustomer.name} onChange={handleInputChange} required />
        <button type="submit">Add Customer</button>
      </form>
      <h2>Customer List</h2>
      <table>
        <thead>
          <tr>
            <th>Sr</th>
            <th>Mobile</th>
            <th>Name</th>
            <th>Since</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{customer.mobile}</td>
              <td>{customer.name}</td>
              <td>{new Date(customer.since).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Customers;
