import React, { useContext } from 'react';
import { AuthContext } from './auth.js';

// Routes.jsx
import PrivateRoutes from './privateRoutes.js';
import PublicRoutes from './publicRoutes.js';


const Routes = (props) => {
    const { user } = useContext(AuthContext);

    return user ?

        <>
            <PrivateRoutes />
        </>
        : <PublicRoutes />;
}

export default Routes;
