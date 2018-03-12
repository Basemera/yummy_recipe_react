import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const SignUpCard = ({ username, firstname, email, password, confirm_password, handleInputChange, onClick}) => (
    <div>
        <div className="container signup-bg-image ">
            <div className="row">
                <div className='jumbotron signup-bg'>

                    <h2 className="signup-heading"> Sign up</h2>
                    <p> Fill in the details and sign up to enjoy the app benefits</p>

                    <form className="signup-form text-center" onSubmit={onClick} name="sign-up">

                        <div className="form-group" >
                            <label className="register-label" >Username:</label>
                            <input className="register-info" name="username" value={username} placeholder='Basemera'
                                onChange={handleInputChange} required />
                        </div>
                        <div className="form-group">
                            <label className="register-label" >Email:</label>
                            <input className="register-info" name="email" value={email} placeholder='basemera@example.com'
                                onChange={handleInputChange} required />
                        </div>
                        <div className="form-group">
                            <label className="register-label" >Firstname:</label>
                            <input className='register-info' name="firstname" value={firstname} placeholder="Phiona"
                                onChange={handleInputChange} required />
                        </div>
                        <div className="form-group">
                            <label className="register-label" >Password:</label>
                            <input required type="password" className='register-info' name="password" value={password} placeholder="Basemera" onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label className="confirm-password">Confirm Password:</label>
                            <input type="password" className='register-info' name="confirm_password" value={confirm_password}
                                placeholder='phiona' onChange={handleInputChange} required></input>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-offset-5 col-sm-5">
                                <button type="submit" value="Sign up" className="btn btn-succeass submit-button">Submit</button>
                            </div>
                        </div>
                    </form>
                    <div className="login-register">
                        Already signed up just
                        <Link name = "login" to="/login">  Login</Link>
                    </div>
                </div>

            </div>
        </div>
    </div>
);
export default SignUpCard;

