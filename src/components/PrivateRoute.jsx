// PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, isLoggedIn, ...rest }) => {
    return (
        <Route
            {...rest}
            element={isLoggedIn ? <Component /> : <Navigate to="/" replace />}
        />
    );
};

export default PrivateRoute;
