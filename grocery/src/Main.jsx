import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Main.css';  // Import the CSS file

const NewCustomer = () => {
    const [customer, setCustomer] = useState({
        name: '',
        email: '',
        mobile: '',
        dateOfBirth: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomer({
            ...customer,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/customers', customer);
            alert('Customer created successfully');
        } catch (error) {
            console.error('Error creating customer', error);
            alert('Error creating customer');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input type="text" name="name" value={customer.name} onChange={handleChange} required />
            </div>
            <div>
                <label>Email:</label>
                <input type="email" name="email" value={customer.email} onChange={handleChange} required />
            </div>
            <div>
                <label>Mobile:</label>
                <input type="text" name="mobile" value={customer.mobile} onChange={handleChange} required />
            </div>
            <div>
                <label>Date of Birth:</label>
                <input type="date" name="dateOfBirth" value={customer.dateOfBirth} onChange={handleChange} required />
            </div>
            <button type="submit">Create</button>
        </form>
    );
};

const Customers = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = () => {
        axios.get('http://localhost:5000/api/customers')
            .then(response => setCustomers(response.data))
            .catch(error => console.error('There was an error!', error));
    };

    return (
        <div className="App">
            <h1>Customers</h1>
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
};

const App = () => {
    const [page, setPage] = useState('new-customer');

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    return (
        <div>
            <div>
                <button onClick={() => handlePageChange('new-customer')}>New Customer</button>
                <button onClick={() => handlePageChange('customers')}>Customers</button>
            </div>
            {page === 'new-customer' && <NewCustomer />}
            {page === 'customers' && <Customers />}
        </div>
    );
};

export default App;
