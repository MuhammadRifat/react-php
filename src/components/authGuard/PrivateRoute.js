import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { userContext } from '../../App';

const PrivateRoute = ({ children, ...rest }) => {
    const [dataContainer] = useContext(userContext);
    
    return dataContainer.username ? children : <Navigate to="/login" />
};

export default PrivateRoute;