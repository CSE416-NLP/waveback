import React from 'react';
import { COLOR_SCHEMES } from '../styles/colorSchemes'
import '../styles/css/index.css';
import wavebackTextFG from '../images/waveback text fg.png';
import wavebackTextBG from '../images/waveback text bg.png';

const changeStyle = (style) => {
    document.documentElement.style.setProperty("--primary", style.primary);
    document.documentElement.style.setProperty("--secondary", style.secondary);
    document.documentElement.style.setProperty("--accent", style.accent);
    document.documentElement.style.setProperty("--background", style.background);
    document.documentElement.style.setProperty("--hue", style.hue);
}

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
            <header className="App-header" style={{backgroundColor: "var(--background)"}}>
                <p className="app_logo_container">
                    <img src={wavebackTextBG} className="appLogoBG" alt="" />
                    <img src={wavebackTextFG} className="appLogoFG" alt="" style={{filter: "hue-rotate(var(--hue))"}}/>     
                </p>

                <div className="splashLoginContainer" >
                    <p className="splashTextSubtitle" style={{color: "var(--accent)"}}>
                        waveback is a simple, yet powerful, playlist creation tool.<br></br>relive the sounds of the past like never before.
                    </p>
                    <div className="splashLoginBox" style={{backgroundColor: "var(--primary)"}}>
                        <div className="splashText" style={{color: "var(--accent)"}}>Sign In</div>
                        <div className="ui input splashInputContainer">
                            <input size="25" className="splashInput" placeholder="Username" style={{backgroundColor: "var(--secondary)"}}/>
                        </div>
                        <div className="ui input splashInputContainer">
                            <input size="25" className="splashInput" placeholder="Password" style={{backgroundColor: "var(--secondary)"}}/>
                        </div>
                        <div className="splashTextSmall" onClick={handleForgotPassword}>Forgot Password?</div>
                        <div><button className="ui black huge button" onClick={handleLogin}>Log In</button></div>
                        <div className="splashTextSmall" onClick={handleRegister}>Create Account</div>
                    </div>
                </div>
                
                <div className="splashTestSelect">
                    <div className="splashText ripple" onClick={() => props.history.push({ pathname: "/admin", key: true })}>Go to admin</div>
                    <div className="splashText ripple" onClick={() => props.history.push({ pathname: "/test", key: true })}>Go to test</div>
                    <select onChange={(e) => {
                        changeStyle(COLOR_SCHEMES[e.target.value])
                    }}>
                        <option value={"Default"}>Default</option>
                        <option value={"Vintage"}>Vintage</option>
                        <option value={"Retro"}>Retro</option>
                    </select>
                </div>
            </header>
        </div>
    );
};

export default SplashScreen;