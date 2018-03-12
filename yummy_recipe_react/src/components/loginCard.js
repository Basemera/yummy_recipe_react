import React, { Component } from 'react';
import { logInUser } from '../api_wrapper/users';
import { setToken } from '../utils/authservice';

const LoginCard = ({ username, password, handleInputChange, onClick}) => (
   
    <div className="text-center">
          <form className="form-signin" name="login" onSubmit={onClick}>
            <img className="mb-4" src="https://getbootstrap.com/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72" />
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
        
);
export default LoginCard;
