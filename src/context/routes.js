import React, { useContext } from 'react';
import { AuthContext } from './auth.js';

// Routes.jsx
import PrivateRoutes from './privateRoutes.js';
import PublicRoutes from './publicRoutes.js';
import ChatBottom from './ChatRoute.js';

const Routes = (props) => {
    const { user } = useContext(AuthContext);

    // return <PublicRoutes/>

    return user ?

        <>
            <PrivateRoutes />
        </>
        : <PublicRoutes />;
}

export default Routes;
