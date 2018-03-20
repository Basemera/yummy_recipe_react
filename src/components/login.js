import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import { logInUser } from '../api_wrapper/users';
import LoginCard from './loginCard';
import { setToken } from '../utils/authservice';

/**
 * Component to log in a user*.
 */
class LogIn extends Component {
    static propTypes = {
        login: PropTypes.func.isRequired,
    };
    state = {
        username: '',
        password: '',
        loginSuccess: false,
    };

    onClick = (event) => {
        event.preventDefault();
        const { username, password } = this.state;
        logInUser({ username, password })
            .then((response) => {
                toastr.success('User logged in successfully');
                setToken(response.data.token);
                this.props.login();
                // this.props.history.push('/view-categories')
            })
            .catch((error) => {
                toastr.error(error.response.data.message);
            });
    };

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    render() {
        if (this.props.loggedIn) {
            return <Redirect to="/view-categories" />;
        }

        return (
            <React.Fragment>
                <div id="wrapper">
                    <LoginCard
                        {...this.state}
                        handleInputChange={this.handleInputChange}
                        onClick={this.onClick}
                    />
                </div>
            </React.Fragment>
        );
    }
}
export default LogIn;
