import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import { logInUser } from '../api_wrapper/users';
import LoginCard from './loginCard'
import { setToken } from '../utils/authservice';
import toastr from 'toastr';
import PropTypes from 'prop-types';

/**
 * Component to log in a user*.
 */
class LogIn extends Component {
  state = {
    username: '',
    password: '',
    loginSuccess: false
  };
static propTypes = {
  login: PropTypes.func.isRequired
}

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value })
  }

  onClick = event => {
    event.preventDefault();
    const { username, password } = this.state;
    logInUser({ username, password })
      .then((response) => {
        toastr.success('User logged in successfully')
        setToken(response.data.token)
        this.props.login()
        // this.props.history.push('/view-categories')
      })
      .catch(function (error) {
        console.log(error.response.data.message)
        toastr.error(error.response.data.message)
      });
  }
  render() {
    const { username, password } = this.state
    // const {from} = this.props.location.state || {
    //   from: {
    //       pathname: 
    //   }
  // }

  if (this.props.loggedIn) {
      return (<Redirect to='/view-categories'/>)
  }

    return (
      <React.Fragment>
        <div id="wrapper">
          <LoginCard {...this.state} handleInputChange={this.handleInputChange} onClick={this.onClick}/>
        </div>
      </React.Fragment>
    )
  }
}
export default LogIn;