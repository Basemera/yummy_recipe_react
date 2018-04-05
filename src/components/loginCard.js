import React from 'react';

/**
 * Renders the log in form*.
 */
const LoginCard = ({
    username, password, handleInputChange, onClick,
}) => (
    <div>
        {/* <div className="container signup-bg-image ">
            <div className="row login-margin"> */}
                <div className="jumbotron signup-bg">
                    <h2 className="signup-heading"> Log in</h2>

                    <form onSubmit={onClick} name="sign-up">
                        <div className="form-group">
                            <label className="label-center-login">Username</label>
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
                            <label className="label-center-login">Password</label>
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

                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                        <p className="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
                    </form>
                </div>
            {/* </div>
        </div> */}
    </div>
);
export default LoginCard;
