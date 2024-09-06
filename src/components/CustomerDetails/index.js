import React, { Component } from 'react';
import AddressForm from '../AddressForm';
import './index.css'; // Add a custom CSS file for styling

class CustomerDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: null,
      addresses: [],
      showAddressForm: false
    };
  }

  componentDidMount() {
    this.fetchCustomerDetails();
    this.fetchAddresses();
  }

  fetchCustomerDetails = () => {
    const { id } = this.props.match.params;
    fetch(`https://qwipo-backend-2.onrender.com/customers/${id}`)
      .then(response => response.json())
      .then(data => this.setState({ customer: data }))
      .catch(error => console.error('Error fetching customer details:', error));
  };

  fetchAddresses = () => {
    const { id } = this.props.match.params;
    fetch(`https://qwipo-backend-2.onrender.com/customers/${id}/addresses`)
      .then(response => response.json())
      .then(data => this.setState({ addresses: data }))
      .catch(error => console.error('Error fetching addresses:', error));
  };

  toggleAddressForm = () => {
    this.setState((prevState) => ({
      showAddressForm: !prevState.showAddressForm
    }));
  };

  handleAddAddress = (newAddress) => {
    const { id } = this.props.match.params;
    fetch(`https://qwipo-backend-2.onrender.com/customers/${id}/addresses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address: newAddress })
    })
      .then(response => response.json())
      .then(() => {
        this.fetchAddresses();
        this.toggleAddressForm();
      })
      .catch(error => console.error('Error adding address:', error));
  };

  handleDeleteAddress = (addressId) => {
    const { id } = this.props.match.params;
    fetch(`https://qwipo-backend-2.onrender.com/customers/${id}/addresses/${addressId}`, {
      method: 'DELETE'
    })
      .then(() => {
        this.setState({
          addresses: this.state.addresses.filter(address => address.id !== addressId)
        });
      })
      .catch(error => console.error('Error deleting address:', error));
  };

  render() {
    const { customer, addresses, showAddressForm } = this.state;

    return (
      <div className="customer-details-container">
        {customer && (
          <div className="customer-info">
            <h2>{customer.first_name} {customer.last_name}</h2>
            <p>Email: {customer.email}</p>
            <p>Phone: {customer.phone}</p>
          </div>
        )}

        <div className="address-section">
          <h3>Addresses</h3>
          {addresses.length === 0 ? (
            <p>No addresses found.</p>
          ) : (
            <ul className="address-list">
              {addresses.map(address => (
                <li key={address.id} className="address-item">
                  <span>{address.address}</span>
                  <button className="btn-delete" onClick={() => this.handleDeleteAddress(address.id)}>Delete</button>
                </li>
              ))}
            </ul>
          )}

          <button className="btn-add" onClick={this.toggleAddressForm}>
            {showAddressForm ? 'Close Form' : 'Add Address'}
          </button>

          {showAddressForm && (
            <AddressForm onAddAddress={this.handleAddAddress} />
          )}
        </div>
      </div>
    );
  }
}

export default CustomerDetails;
