import React, { useState } from 'react';
import './BillPage.css';
const BillPage = () => {
  const [searchFilters, setSearchFilters] = useState({
    mobile: '',
    billNumber: '',
    date: '',
    customer: '',
    cashier: ''
  });

  const [billData, setBillData] = useState([]); // Assuming billData is fetched from somewhere

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSearchFilters({ ...searchFilters, [name]: value });
  };

  const handleSearch = () => {
    // Implement search functionality here
    console.log(searchFilters);
  };

  const handleDelete = (id) => {
    // Implement delete functionality here
    console.log(`Deleting data with ID: ${id}`);
  };

  const handleEdit = (id) => {
    // Implement edit functionality here
    console.log(`Editing data with ID: ${id}`);
  };

  return (
    <div>
      <h1>Bill Page</h1>
      <h2>Search Filter</h2>
      <div>
        <label htmlFor="mobile">Mobile:</label>
        <input type="text" id="mobile" name="mobile" value={searchFilters.mobile} onChange={handleInputChange} />
      </div>
      <div>
        <label htmlFor="billNumber">Bill Number:</label>
        <input type="text" id="billNumber" name="billNumber" value={searchFilters.billNumber} onChange={handleInputChange} />
      </div>
      <div>
        <label htmlFor="date">Date:</label>
        <input type="date" id="date" name="date" value={searchFilters.date} onChange={handleInputChange} />
      </div>
      <div>
        <label htmlFor="customer">Customer:</label>
        <input type="text" id="customer" name="customer" value={searchFilters.customer} onChange={handleInputChange} />
      </div>
      <div>
        <label htmlFor="cashier">Cashier:</label>
        <input type="text" id="cashier" name="cashier" value={searchFilters.cashier} onChange={handleInputChange} />
      </div>
      <button onClick={handleSearch}>Search</button>

      <h2>Bill Data</h2>
      {billData.map((bill, index) => (
        <div key={index}>
          <p>{/* Display bill data here */}</p>
          <button onClick={() => handleDelete(bill.id)}>Delete</button>
          <button onClick={() => handleEdit(bill.id)}>Edit</button>
        </div>
      ))}
    </div>
  );
};

export default BillPage;
