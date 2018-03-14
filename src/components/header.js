import React, { Component } from 'react';
import SignUp from './signup'
import {Link} from 'react-router-dom';
class HeaderView extends Component{
    render() {
  
  
      return(
        <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
        <div className = 'navbar-brand'>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">

    <form className="form-inline my-2 my-lg-0">
    <div className="nav-link">Login <span className="sr-only">(current)</span></div>
    <Link to="/register" id="signup" className="btn btn-primary"> Signup</Link>
    <Link to="/login" id="login" className="btn btn-primary">Login</Link>
    <Link to="/" id="signup" className="btn btn-primary"> Home</Link>

    </form>
    </div>
    </div>
</nav>
  
      );
    }

    onSignup = () =>{
      // this.props.history.push(`/signup`)
      <SignUp/>
    }

    renderSignup(){}
    }
  export default HeaderView;