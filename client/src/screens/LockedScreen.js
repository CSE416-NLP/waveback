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
            <div style={{ backgroundColor: "var(--primary)", height: "75px" }}>This is primary</div>
            <div style={{ backgroundColor: "var(--secondary)", height: "75px" }}>This is secondary</div>
            <div style={{ backgroundColor: "var(--tertiary)", height: "75px" }}>This is tertiary</div>
            <div style={{ backgroundColor: "var(--accent)", height: "75px" }}>This is accent</div>
            <div style={{ backgroundColor: "var(--background)", height: "75px" }}>This is background</div>
            <Link to="/">Go back home</Link>
        </div>
    );
};

export default LockedScreen;