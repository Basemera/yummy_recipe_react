import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Renders the signup form*.
 */
const SignUpCard = ({ username, firstname, email, password, confirm_password, handleInputChange, onClick}) => (
    <div>
        <div className="container signup-bg-image ">
            <div className="row">
                <div className='jumbotron signup-bg'>

                    <h2 className="signup-heading"> Sign up</h2>
                    <p> Fill in the details and sign up to enjoy the app benefits</p>

                    <form className="form-signup text-center" onSubmit={onClick} name="sign-up">

                        <div className="form-group" >
                        <label htmlFor="inputUsername" >Username</label>
                            <input className="form-control" name="username" value={username} placeholder='Basemera'
                                onChange={handleInputChange} required />
                        </div>
                        <div className="form-group">
                        <label htmlFor="inputEmail" >Email</label>
                            <input className="form-control" name="email" value={email} placeholder='basemera@example.com'
                                onChange={handleInputChange} required />
                        </div>
                        <div className="form-group">
                        <label htmlFor="inputFirst" >Firstname</label>
                            <input className="form-control" name="firstname" value={firstname} placeholder="Phiona"
                                onChange={handleInputChange} required />
                        </div>
                        <div className="form-group">
                        <label htmlFor="inputPassword" >Password</label>
                            <input required type="password" className="form-control" name="password" value={password} placeholder="Basemera" onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                        <label htmlFor="inputConfirmPassword" >Confirm Password</label>
                            <input type="password" className="form-control" name="confirm_password" value={confirm_password}
                                placeholder='phiona' onChange={handleInputChange} required></input>
                        </div>
                        <div className="form-group">
                            
                                <button type="submit" value="Sign up" className="btn btn-success submit-button">Submit</button>
                           
                        </div>
                        Already signed up just
                        <Link name = "login" to="/login">  Login</Link>
                    </form>
                    {/* <div className="login-register">
                        Already signed up just
                        <Link name = "login" to="/login">  Login</Link>
                    </div> */}
                </div>

            </div>
        </div>
    </div>
);
export default SignUpCard;

