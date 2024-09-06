import React, { Component } from 'react';

class AddressForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newAddress: ''
    };
  }

  handleChange = (e) => {
    this.setState({ newAddress: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onAddAddress(this.state.newAddress);
    this.setState({ newAddress: '' });
  };

  render() {
    const { newAddress } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className="address-form">
        <input
          type="text"
          value={newAddress}
          onChange={this.handleChange}
          placeholder="Enter new address"
        />
        <button type="submit">Add Address</button>
      </form>
    );
  }
}

export default AddressForm;
