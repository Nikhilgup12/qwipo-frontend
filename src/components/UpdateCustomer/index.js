import React, { Component } from 'react';
import "./index.css"
class UpdateCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phone:"",
      address:""

    };
  }

  componentDidMount() {
    this.fetchCustomerDetails();
  }

  fetchCustomerDetails = () => {
    const { id } = this.props.match.params;
    fetch(`https://qwipo-backend-3.onrender.com/customers/${id}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          firstName: data.first_name,
          lastName: data.last_name,
          email: data.email,
          phone: data.phone,
          address: data.address
        });
      })
      .catch(error => console.error('Error fetching customer details:', error));
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, phone,address } = this.state;
    const { id } = this.props.match.params;

    fetch(`https://qwipo-backend-3.onrender.com/customers/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ first_name: firstName, last_name: lastName, email:email, phone:phone,address:address })
    })
    .then(response => {
        if (!response.ok) {
          return response.text().then(text => { 
            throw new Error(text);
          });
        }
        return response.text(); 
      })
      .then(responseText => {
        console.log('Response Text:', responseText);
        this.props.history.push(`/customers/${id}`);
      })
      .catch(error => console.error('Error updating customer:', error));
  };

  render() {
    const { firstName, lastName, email, phone,address } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className="update-customer-form">
        <input
          type="text"
          name="firstName"
          value={firstName}
          onChange={this.handleChange}
          placeholder="First Name"
        />
        <input
          type="text"
          name="lastName"
          value={lastName}
          onChange={this.handleChange}
          placeholder="Last Name"
        />
        <input
          type="email"
          name="email"
          value={email}
          onChange={this.handleChange}
          placeholder="Email"
        />
        <input
          type="text"
          name="phone"
          value={phone}
          onChange={this.handleChange}
          placeholder="Phone"
        />
        <input
          type="text"
          name="address"
          value={address}
          onChange={this.handleChange}
          placeholder="Address"
        />
        <button type="submit">Update Customer</button>
      </form>
    );
  }
}

export default UpdateCustomer
