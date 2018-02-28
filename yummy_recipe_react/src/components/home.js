import React, { Component } from 'react';
import {Link} from 'react-router-dom';

// import PropTypes from 'prop-types';

class HomeView extends Component {
  render() {


    return(
      <div className="background">
        <div className='navigation'>
          <div id='header'>Yummy Recipe App</div>
          <div className='nav'>
          <Link to="/register" id="signup" className="btn btn-primary"> Signup</Link>
          <Link to="/login" id="login" className="btn btn-primary">Login</Link>
          </div>
        </div>        
 
    <div className='Welcome'>     
      Welcome to yummy recipes app. This app will help you to manage your
          recipes. If you have already signed up please login to continue.
     If not please signup to enjoy.
    </div>
        </div>

    );
  }
  }
export default HomeView;