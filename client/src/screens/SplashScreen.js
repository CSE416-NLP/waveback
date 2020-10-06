import React from 'react';
import wavebackLogo from '../images/WB Circle Logo V2.png';
import { Link } from 'react-router-dom';
import '../css/index.css';

const SplashScreen = (props) => {
    return (
        <div className="App">
            <header className="App-header">
                <p>
                    <img src={wavebackLogo} className="App-logo" alt="r" />
                </p>
                <Link to={{ pathname: "/admin", beter: "zeng", state: { foo: "bar" } }}>Click me to go to administrator screen (wink)</Link>
                {/* We can also pass just the path rather than an entire location object, 
                    depends on if we have additonal fields we want to pass in. */}
                <span className="clickable" onClick={() => props.history.push("/admin")}>Or click me to do the same!</span>
                <span className="clickable" onClick={() => props.history.push({ pathname: "/test", key: true })}>Go to test</span>
            </header>
        </div>
    );
};

export default SplashScreen;