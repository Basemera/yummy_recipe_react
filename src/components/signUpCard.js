import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Renders the signup form*.
 */
const SignUpCard = ({
    username,
    firstname,
    email,
    password,
    confirm_password,
    handleInputChange,
    onClick,
}) => (
    <div>
        {/* <div className="container signup-bg-image ">
            <div className="row signup-margin"> */}
                <div className="jumbotron signup-bg">
                    <h2 className="signup-heading"> Signup</h2>
                    <p> Fill in the details and sign up to enjoy the app benefits</p>

                    <form onSubmit={onClick} name="sign-up">
                        <div className="form-group">
                            <label className="label-center">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                name="username"
                                value={username}
                                placeholder="Basemera"
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="label-center">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                name="email"
                                value={email}
                                placeholder="basemera@gmail.com"
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="label-center">First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                name="firstname"
                                value={firstname}
                                placeholder="Basemera"
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="label-center">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="exampleInputPassword1"
                                name="password"
                                value={password}
                                placeholder="password"
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label className="label-center">Confirm Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="exampleInputPassword1"
                                name="confirm_password"
                                value={confirm_password}
                                placeholder="password"
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <small id="emailHelp" className="form-text text-muted">
                            We'll never share your information with anyone else.
                        </small>

                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </form>
                </div>
            {/* </div>
        </div> */}
    </div>
);
export default SignUpCard;
