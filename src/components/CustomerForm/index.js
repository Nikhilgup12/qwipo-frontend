import React, { Component } from 'react';
import './index.css'; // Import your CSS file

class CustomerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: ''
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, phone, address } = this.state;

    // Make the POST API call to create a new customer
    fetch('https://qwipo-backend-3.onrender.com/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone,
        address: address
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Customer created successfully:', data);
     
        this.setState({ firstName: '', lastName: '', email: '', phone: '', address: '' });
      })
      .catch((error) => console.error('Error creating customer:', error));
  };

  render() {
    const { firstName, lastName, email, phone, address } = this.state;

    return (
      <div className="customer-form-container">
        <h2>Create New Customer</h2>
        <form onSubmit={this.handleSubmit} className="customer-form">
          <div className="form-group">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={lastName}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={phone}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={address}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <button type="submit" className="submit-button">Create Customer</button>
        </form>
      </div>
    );
  }
}

export default CustomerForm;
