import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// function for private urls which cant be accessed before login
const ProtectedRoute = ({ component: Component, ...others }) => (
    <Route
        {...others}
        render={props =>
            (others.loggedIn ? (
                <Component {...props} {...others} />
            ) : (
                <Redirect
                    to={{
                        pathname: '/login',
                        state: { from: props.location },
                    }}
                />
            ))
        }
    />
);
export default ProtectedRoute;
