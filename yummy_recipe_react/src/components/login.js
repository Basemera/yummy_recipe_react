import React, { Component } from 'react';
import { logInUser } from '../api_wrapper/users';
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
        console.log('here', error.response);
      });
  }
  render() {
    const { username, password } = this.state
    return (
      <React.Fragment>
        <div class="text-center">
          <form class="form-signin"  onSubmit={this.onClick}>
            <img class="mb-4" src="https://getbootstrap.com/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72" />
            <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
            <label for="inputEmail" >Username</label>
            <input
              class="form-control"
              placeholder='Enter your username'
              name="username"
              value={username}
              onChange={this.handleInputChange}
              required>
            </input>
            <label for="inputPassword" >Password</label>
            <input
              class="form-control"
              type="password"
              name="password" value={password}
              placeholder='Enter your Password'
              onChange={this.handleInputChange}
              required
              autofocus>
            </input>
            <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
            <p class="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
          </form>
        </div>
      </React.Fragment >
    )
  }
}
export default LogIn;