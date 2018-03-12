import React, { Component } from 'react';
import { logInUser } from '../api_wrapper/users';
import LoginCard from './loginCard'
import { setToken } from '../utils/authservice';
import toastr from 'toastr';
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
        toastr.error(error.response.data.message)
      });
  }
  render() {
    const { username, password } = this.state
    return (
      <React.Fragment>
      <LoginCard {...this.state} handleInputChange={this.handleInputChange} onClick={this.onClick}/>
    </React.Fragment>
    )
  }
}
export default LogIn;