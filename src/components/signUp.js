import React, { Component } from 'react';
import toastr from 'toastr';
import { Redirect } from 'react-router-dom';
import { userSignUp } from '../api_wrapper/users';
import SignUpCard from './signUpCard';

/**
 * Component for registering a user.*
 */
class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            firstname: '',
            password: '',
            confirm_password: '',
            loginSuccess: false,
        };
    }

    onClick = (event) => {
        event.preventDefault();
        const {
            username,
            firstname,
            email,
            password,
            confirm_password,
        } = this.state;
        userSignUp({
            username,
            firstname,
            email,
            password,
            confirm_password,
        })
            .then((response) => {
                toastr.success(response.data.message);
                this.setState(
                    { loginSuccess: true },
                    this.props.history.push('/login'),
                );
            })
            .catch((error) => {
                let err = '';
                for (const key of Object.keys(error.response.data.error)) {
                    err = err + ' and ' + error.response.data.error[key];
                }
                toastr.error(err);
            });
        this.setState({
            username: '',
            email: '',
            firstname: '',
            password: '',
            confirm_password: '',
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
        if (this.state.loginSuccess) {
            return <Redirect to="/login" />;
        }
        const {
            username,
            firstname,
            email,
            password,
            confirm_password,
        } = this.state;
        return (
            <div id="wrapper">
                <SignUpCard
                    {...this.state}
                    handleInputChange={this.handleInputChange}
                    onClick={this.onClick}
                />
            </div>
        );
    }
}
export default SignUp;
