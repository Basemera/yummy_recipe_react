import React from 'react';
import { Link } from 'react-router-dom';

const Nav = props => (
    <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    {!props.loggedIn ? (
                        <div>
                            <a className="nav-item nav-link" href="/">
                                Home
                                <span className="sr-only">(current)</span>
                            </a>

                            <Link
                                to="/signup"
                                id="signup"
                                className="btn btn-primary"
                            >
                                {' '}
                                Signup
                            </Link>
                            <Link to="/login" id="login" className="btn btn-primary">
                                Login
                            </Link>
                        </div>
                    ) : (
                        <div className="sign-out">
                            <Link
                                className="nav-item nav-link"
                                to="#"
                                onClick={(event) => {
                                    props.logout(event);
                                }}
                            >
                                Signout
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </nav>
);
export default Nav;
