import React from 'react';

/**
 * Renders the log in form*.
 */
const LoginCard = ({
    username, password, handleInputChange, onClick,
}) => (
    <div>
        <div className="container signup-bg-image ">
            <div className="row login-margin">
                <div className="jumbotron signup-bg">
                    <h2 className="signup-heading"> Log in</h2>

                    <form
                        className="form-signup text-center"
                        onSubmit={onClick}
                        name="sign-up"
                    >
                        <div className="form-group">
                            {/* <h1 className="h3 mb-3 font-weight-normal">
                                Please log in
                            </h1> */}
                            <label htmlFor="inputEmail">Username</label>
                            <input
                                className="form-control"
                                placeholder="Enter your username"
                                name="username"
                                value={username}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputPassword">Password</label>
                            <input
                                className="form-control"
                                type="password"
                                name="password"
                                value={password}
                                placeholder="Enter your password"
                                onChange={handleInputChange}
                                required
                                autoFocus
                            />
                        </div>

                        <div className="form-group">
                            <button
                                value="log in"
                                type="submit"
                                className="btn btn-success submit-button"
                            >
                                Submit
                            </button>
                            <p className="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
);
export default LoginCard;
