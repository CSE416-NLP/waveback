import React from 'react';
import { Redirect, Link } from 'react-router-dom';

/*  This is really more of a testing file for playing around with the router 
    but maybe you guys find it interesting to look at as something that can
    be done.  */

const LockedScreen = (props) => {
    if (!props.location.key)
        return <Redirect to="/" />
    return (
        <div className="App">
            <p>Can only get here from clicking link, not directly from url</p>
            <Link to="/">Go back home</Link>
        </div>
    );
};

export default LockedScreen;