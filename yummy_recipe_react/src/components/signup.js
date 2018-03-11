import React, { Component } from 'react';
import axios from 'axios';
import toastr from 'toastr';
import {Redirect, Link} from 'react-router-dom';
import {signUpUser} from '../api_wrapper/users';
import { userSignUp, deleteCategory, getCategories, editCategory } from '../api_wrapper/users';

class SignUp extends Component{
  constructor(props) {
    super(props);
    this.state={
      username: '',
      email: '',
      firstname: '',
      password: '',
      confirm_password: '',
      loginSuccess: false,
      };
  }
    

  handleInputChange = (event) => {
      const {name, value} = event.target;
      this.setState({[name]: value})
      
    }
  
  onClick = event => {
    event.preventDefault();
    const {username, firstname, email, password, confirm_password} = this.state;
    userSignUp({username, firstname, email, password, confirm_password})
    .then((response) => {
      console.log(response.data);
      toastr.success(response.data.message)
      this.setState({ loginSuccess: true },
      this.props.history.push('/login')
      )
    })
    .catch((error) => {
      console.log(error.response.data);
      toastr.error(error.response.data)
    });
    this.setState({
      username:'',
      email:'',
      firstname:'',
      password:'',
      confirm_password:''
      });
  }

  render(){
    
    if (this.state.loginSuccess) {
      return (<Redirect to='/login'/>)
    } 
    const {username, firstname, email, password, confirm_password} = this.state
        return(
        <div>
  <div className = "container signup-bg-image ">
    <div className = "row">
    <div className = 'jumbotron signup-bg'>
        
<h2 className= "signup-heading"> Sign up</h2>
<p> Fill in the details and sign up to enjoy the app benefits</p>

        <form className="signup-form text-center" onSubmit={this.onClick} name="sign-up">

                <div className="form-group" >
                <label className="register-label" >Username:</label>
                <input className="register-info" name="username" value = {this.state.username} placeholder='Basemera'
                onChange = {this.handleInputChange} required/>
                </div>
                <div className="form-group">
                <label className="register-label" >Email:                </label>
                <input className="register-info" name="email" value = {this.state.email} placeholder='basemera@example.com' 
                onChange = {this.handleInputChange} required/>
                </div>
                <div className="form-group">
                <label className="register-label" >Firstname:</label>
                <input className='register-info' name="firstname" value = {this.state.firstname} placeholder="Phiona" 
                onChange = {this.handleInputChange} required/>
                </div>
      <div className="form-group">
              <label className="register-label" >Password:</label>
              <input type = "password" className='register-info' name="password" value = {this.state.password} placeholder="Basemera" onChange = {this.handleInputChange}/>
      </div>
      <div className="form-group">
              <label className="confirm-password">Confirm Password:</label>
              <input type = "password" className='register-info' name="confirm_password" value = {this.state.confirm_password} 
              placeholder='phiona' onChange = {this.handleInputChange} required></input>
      </div>
      <div className="form-group"> 
              <div className="col-sm-offset-5 col-sm-5">
              <button type="submit" className="btn btn-success submit-button">Submit</button>
      </div>
      </div>

    
  </form>
  <div className = "login-register">
  Already signed up just   
  <Link to="/login">  Login</Link>
  </div>
    </div>

</div>
</div>

        </div>);

    }
  }
export default SignUp;
