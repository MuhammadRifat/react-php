import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { userContext } from '../../App';

const PrivateRoute = ({ children }) => {
    const [dataContainer] = useContext(userContext);
    
    return dataContainer.token ? children : <Navigate to="/login" />
};

export default PrivateRoute;