import React from 'react';
import { COLOR_SCHEMES } from '../styles/colorSchemes'
import '../styles/css/index.css';
import wavebackTextFG from '../images/waveback text fg.png';
import wavebackTextBG from '../images/waveback text bg.png';

const changeStyle = (style) => {
    document.documentElement.style.setProperty("--primary", style.primary);
    document.documentElement.style.setProperty("--secondary", style.secondary);
    document.documentElement.style.setProperty("--tertiary", style.tertiary);
    document.documentElement.style.setProperty("--accent", style.accent);
    document.documentElement.style.setProperty("--background", style.background);
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
                    <img src={wavebackTextBG} className="appLogoBG" alt="r" />
                    <img src={wavebackTextFG} className="appLogoFG" alt="r" />     
                </p>

                <div>
                    <div onClick = {handleLogin} className="splashText ripple" style={{color: "var(--accent)"}}>login</div>
                    <div onClick = {handleRegister} className="splashText ripple" style={{color: "var(--accent)"}}>register</div>
                    <div onClick = {handleForgotPassword} className="splashText ripple" style={{color: "var(--accent)"}}>forgot password?</div>
                    <div className="splashText ripple" onClick={() => props.history.push({ pathname: "/admin", key: true })}>Go to admin</div>
                    <div className="splashText ripple" onClick={() => props.history.push({ pathname: "/test", key: true })}>Go to test</div>
                </div>
                
                <div className="splashTestSelect">
                    
                    <select onChange={(e) => {
                        changeStyle(COLOR_SCHEMES[e.target.value])
                    }}>
                        <option value={"1950s"}>1950s</option>
                        <option value={"1960s"}>1960s</option>
                        <option value={"1970s"}>1970s</option>
                        <option value={"1980s"}>1980s</option>
                        <option value={"1990s"}>1990s</option>
                        <option value={"2000s"}>2000s</option>
                        <option value={"2010s"}>2010s</option>
                    </select>
                </div>
            </header>
        </div>
    );
};

export default SplashScreen;