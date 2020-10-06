import React from 'react';
import wavebackLogo from '../images/WB Circle Logo V2.png';

const SplashScreen = (props) => {
    return (
        <div className="App">
            <header className="App-header">
                <p>
                    <img src={wavebackLogo} className="App-logo" alt="r" />
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
        </a>
            </header>
        </div>
    );
};

export default SplashScreen;