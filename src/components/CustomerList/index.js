import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import './index.css';

class CustomerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      search: '',
      pageCount: 0,
      currentPage: 0,
    };
  }

  componentDidMount() {
    this.fetchCustomers();
  }

  fetchCustomers = (page = 0) => {
    const { search } = this.state;
    const pageSize = 10;
    fetch(`https://qwipo-backend-2.onrender.com/all-customers?name=${search}&page=${page}&limit=${pageSize}`)
      .then((response) => response.json())
      .then((data) => this.setState({ 
        customers: data.customers, 
        pageCount: Math.ceil(data.total / pageSize),
        currentPage: page
      }))
      .catch((error) => console.error('Error fetching customers:', error));
  };

  handleSearchChange = (e) => {
    this.setState({ search: e.target.value }, this.fetchCustomers);
  };

  handlePageChange = (selectedPage) => {
    const page = selectedPage.selected;
    this.fetchCustomers(page);
  };

  handleDeleteCustomer = (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      fetch(`https://qwipo-backend-2.onrender.com/customers/${id}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            // Refresh the customer list after deletion
            this.setState({
              customers: this.state.customers.filter((customer) => customer.id !== id),
            });
          } else {
            console.error('Error deleting customer:', response);
          }
        })
        .catch((error) => console.error('Error deleting customer:', error));
    }
  };

  render() {
    const { customers, search, pageCount, currentPage } = this.state;

    return (
      <div className="customer-list-container">
        <h2>Customer List</h2>
        <input
          className="search-input"
          type="text"
          placeholder="Search customers..."
          value={search}
          onChange={this.handleSearchChange}
        />
        <ul className="customer-list">
          {customers.map((customer) => (
            <li key={customer.id} className="customer-item">
              <Link to={`/customers/${customer.id}`} className="customer-link">
                {customer.first_name} {customer.last_name} - {customer.email}
              </Link>
              <div className="button-container">
                <Link to={`/customers/edit/${customer.id}`}>
                  <button className="btn btn-edit">Edit</button>
                </Link>
                <button className="btn btn-delete" onClick={() => this.handleDeleteCustomer(customer.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageChange}
          containerClassName={'pagination'}
          activeClassName={'active'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'page-item'}
          previousLinkClassName={'page-link'}
          nextClassName={'page-item'}
          nextLinkClassName={'page-link'}
          breakClassName={'page-item'}
          breakLinkClassName={'page-link'}
        />
      </div>
    );
  }
}

export default CustomerList;
