import React from 'react';
import {Route, Switch } from 'react-router-dom';
import CustomerForm from './components/CustomerForm';
import CustomerList from './components/CustomerList';
import CustomerDetails from './components/CustomerDetails';
import UpdateCustomer from './components/UpdateCustomer';
import LandingPage from "./components/LandingPage"
import Navbar from './components/Navbar';
function App() {
  return (
    <>
    <Navbar />
         <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/customers-form" component={CustomerForm} />
        <Route exact path="/customers-list" component={CustomerList} />
        <Route exact path="/customers/:id"  component={CustomerDetails} />
        <Route exact path="/customers/edit/:id" component={UpdateCustomer} /> 
      </Switch>
  
    </>
  
  );
}

export default App;
