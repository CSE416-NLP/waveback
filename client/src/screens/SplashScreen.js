import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/css/index.css';
import wavebackTextLogo from '../images/WB Text Logo 1.png';

const handleLogin = () => {
    console.log("login");
};

const handleRegister = () => {
    console.log("register");
};

const handleForgotPassword = () => {
    console.log("forgot password");
}

const SplashScreen = (props) => {
    return (
        <div className="App">
            <header className="App-header">
                <p>
                    <img src={wavebackTextLogo} className="App-logo" alt="r" />
                </p>
                {/* We can also pass just the path rather than an entire location object, 
                    depends on if we have additonal fields we want to pass in. */}
                        
                <div onClick = {handleLogin} className = "navbar_item ripple">Login</div>
                <div onClick = {handleRegister} className = "navbar_item ripple" >Register</div>
                <div onClick = {handleForgotPassword} className = "navbar_item ripple" >Forgot Password?</div>
                
                <span className="clickable" onClick={() => props.history.push({ pathname: "/admin", key: true })}>Go to admin</span>
                <span className="clickable" onClick={() => props.history.push({ pathname: "/test", key: true })}>Go to test</span>
            </header>
        </div>
    );
};

export default SplashScreen;