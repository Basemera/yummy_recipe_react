import React, { Component } from 'react';
import axios from 'axios';
import toastr from 'toastr';
import { Redirect, Link } from 'react-router-dom';
import { signUpUser } from '../api_wrapper/users';
import { userSignUp, deleteCategory, getCategories, editCategory } from '../api_wrapper/users';
import SignUpCard from './signUpCard'
import VideoPlayer from './VideoPlayer'

/**
 * Component for registering a user.*
 */
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      firstname: '',
      password: '',
      confirm_password: '',
      loginSuccess: false,
    };
  }


  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value })

  }

  onClick = event => {
    event.preventDefault();
    const { username, firstname, email, password, confirm_password } = this.state;
    userSignUp({ username, firstname, email, password, confirm_password })
      .then((response) => {
        console.log(response.data);
        toastr.success(response.data.message)
        this.setState({ loginSuccess: true },
          this.props.history.push('/login')
        )
      })
      .catch((error) => {
        console.log("----->", error.response.data);
        toastr.error('Username and firstname cannot begin with numbers, email should have an @ and .com and password must be more than 9 characters')
      });
    this.setState({
      username: '',
      email: '',
      firstname: '',
      password: '',
      confirm_password: ''
    });
  }

  render() {
    if (this.props.loggedIn) {
      return (<Redirect to='/view-categories'/>)
  }
    if (this.state.loginSuccess) {
      return (<Redirect to='/login' />)
    }
    const { username, firstname, email, password, confirm_password } = this.state
    return (
      <div id="wrapper">

        <SignUpCard {...this.state} handleInputChange={this.handleInputChange} onClick={this.onClick} />
      </div>
    )
  }
}
export default SignUp;