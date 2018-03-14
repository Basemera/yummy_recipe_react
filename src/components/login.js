import React, { Component } from 'react';
import { logInUser } from '../api_wrapper/users';
import LoginCard from './loginCard'
import { setToken } from '../utils/authservice';
import toastr from 'toastr';

/**
 * Component for to log in a user*.
 */
class LogIn extends Component {
  state = {
    username: '',
    password: '',
    loginSuccess: false
  };

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
        this.props.history.push('/view-categories')
      })
      .catch(function (error) {
        console.log(error.response.data.message)
        toastr.error(error.response.data.message)
      });
  }
  render() {
    const { username, password } = this.state
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