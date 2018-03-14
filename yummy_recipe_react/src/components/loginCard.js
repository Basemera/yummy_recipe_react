import React, { Component } from 'react';
import { logInUser } from '../api_wrapper/users';
import { setToken } from '../utils/authservice';

/**
 * Renders the log in form*.
 */
const LoginCard = ({ username, password, handleInputChange, onClick}) => (
   
    <div>
        <div className="container signup-bg-image ">
            <div className="row">
                <div className='jumbotron signup-bg'>

                    <h2 className="signup-heading"> Log in</h2>
                    <p> Fill in the details and sign up to enjoy the app benefits</p>
                    <form className="form-signup text-center" onSubmit={onClick} name="login">
            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
            <label htmlFor="inputEmail" >Username</label>
            <input
              className="form-control"
              placeholder='Enter your username'
              name="username"
              value={username}
              onChange={handleInputChange}
              required>
            </input>
            <label htmlFor="inputPassword" >Password</label>
            <input
              className="form-control"
              type="password"
              name="password" 
              value={password}
              placeholder='Enter your Password'
              onChange={handleInputChange}
              required
              autoFocus>
            </input>
            <button className="btn btn-lg btn-primary btn-block" value ="log in" type="submit">Sign in</button>
            <p className="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
          </form>
          </div>

</div>
</div>
</div>
        
);
export default LoginCard;
