import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {logInUser} from '../api_wrapper/users';
import HeaderView from './header'
class LogIn extends Component{
    constructor() {
      super();
      this.state={
        username:'',
        password:'',
        loginSuccess:false
        };
    }
      
  
    handleInputChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value})
        
      }
    
    onClick = event => {
      event.preventDefault();
      const {username, password} = this.state;
      axios.post('http://127.0.0.1:5000/login', {
        username, password,
      })
      .then( (response)=> {
        localStorage.setItem("token", response.data.token)
        this.setState({ loginSuccess: true })
        console.log('logtrue', response.data.token)
        this.props.history.push('/view-categories')
      })
      .catch(function (error) {
        console.log(error.response);
      });
      this.setState({
        username:'',
        password:''
      });
    }
    render(){
      const {username, password} = this.state
    {  return(
        <div>
        <div>
  <HeaderView/>
  </div>
  <div className = "container">
    <div className = "row">
    <div className = 'jumbotron login-bg'>
        
<h2 className= "login-title"> Log in</h2>


        <form className="signin-form" name="sign-up" onSubmit={this.onClick}>

                <div className="form-group" >
                        <label className="register-label" >Username:  </label>
                        <input className='username' placeholder='Basemera' name="username" value = {username} onChange = {this.handleInputChange}></input>
                      </div>
    <div className="form-group">
      <label className="register-label">Password:</label>
      <input className='username' type="password"
               hintText="Enter your Password"
               floatingLabelText="Password"
               name="password" value = {password} placeholder='Basemera' onChange = {this.handleInputChange}></input>
    
    </div>
      <div className="form-group"> 
        <div className="col-sm-offset-5 col-sm-5">
          <button type="submit" className="btn btn-success submit-button">Log in</button>
        </div>
      </div>

    
  </form>
    </div>

</div>
</div>

        </div>
)
    }
}
}
export default LogIn;