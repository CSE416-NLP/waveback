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
            <p>Can only get here from clicking link, not directly from url. Try setting the theme in admin and then coming back here!</p>
            <p style={{ backgroundColor: "var(--primary)" }}>This is primary</p>
            <p style={{ backgroundColor: "var(--secondary)" }}>This is secondary</p>
            <p style={{ backgroundColor: "var(--tertiary)" }}>This is tertiary</p>
            <p style={{ backgroundColor: "var(--accent)" }}>This is accent</p>
            <p style={{ backgroundColor: "var(--background)" }}>This is background</p>
            <Link to="/">Go back home</Link>
        </div>
    );
};

export default LockedScreen;