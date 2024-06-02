import React, { useState } from 'react';
import axios from 'axios';
import './NewCustomer.css';  // Import the CSS file

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

export default NewCustomer;