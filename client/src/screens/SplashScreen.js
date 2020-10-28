import React, { useState } from 'react';
import { Modal, Button, Header, Icon } from 'semantic-ui-react'
import '../styles/css/index.css';
import wavebackTextFG from '../images/waveback text fg.png';
import wavebackTextBG from '../images/waveback text bg.png';
import ThemePicker from '../UtilityComponents/ThemePicker';

const handleRegister = () => {
    console.log("register");
};

const sendRecoveryEmail = () => {
    console.log("forgot password");
}

const SplashScreen = (props) => {
    const [passwordOpenState, setPasswordModalOpenState] = useState(false);
    const [registerOpenState, setRegisterModalOpenState] = useState(false);
  
    return (
        <div className="App">
            <header className="App-header" style={{backgroundColor: "var(--background)"}}>
                <p className="app_logo_container">
                    <img src={wavebackTextBG} className="appLogoBG" alt="" />
                    <img src={wavebackTextFG} className="appLogoFG" alt="" style={{filter: "hue-rotate(var(--hue))"}}/>     
                </p>

                <div className="splashLoginContainer" >
                    <p className="splashTextSubtitle" style={{color: "var(--accent)"}}>
                        waveback is a simple, yet powerful, playlist creation tool.<br/>relive the sounds of the past like never before.
                    </p>
                    <div className="splashLoginBox" style={{backgroundColor: "var(--primary)"}}>
                        <div className="splashText" style={{color: "var(--accent)"}}>Sign In</div>
                        <div className="ui input splashInputContainer">
                            <input size="25" className="splashInput" placeholder="Username" style={{backgroundColor: "var(--secondary)"}}/>
                        </div>
                        <div className="ui input splashInputContainer">
                            <input size="25" className="splashInput" placeholder="Password" style={{backgroundColor: "var(--secondary)"}}/>
                        </div>
                        <Modal 
                            basic 
                            onClose={() => setPasswordModalOpenState(false)}
                            onOpen={() => setPasswordModalOpenState(true)}
                            open={passwordOpenState}
                            size='small' trigger={<div className="splashTextSmall">Forgot Password?</div>}>
                            <Header icon><Icon name='question circle' />Password Recovery</Header>
                            <Modal.Content>
                                <div className="ui input recoverPasswordTextfield">
                                    <input size="50" placeholder="Email" style={{backgroundColor: "var(--secondary)"}}/>
                                </div>
                            </Modal.Content>
                            <Modal.Actions className="recoverPasswordModalButtonContainer">
                                <Button inverted color='red' onClick={() => setPasswordModalOpenState(false)}><Icon name='remove'/>Close</Button>
                                <Button className="ui primary button" onClick={() => handleRegister()}><Icon name='checkmark'/>Send Recovery Email</Button>
                            </Modal.Actions>
                        </Modal>
                        <div>
                            <Button style={{color: "var(--background)", backgroundColor: "var(--buttonColor"}} className="ui huge button" onClick={props.handleLogin}>Log In</Button>
                        </div>
                        <Modal 
                            basic 
                            onClose={() => setRegisterModalOpenState(false)}
                            onOpen={() => setRegisterModalOpenState(true)}
                            open={registerOpenState}
                            size='small' trigger={<div className="splashTextSmall">Create Account</div>}>
                            <Header icon><Icon name='user plus' />Create New Account</Header>
                            <Modal.Content>
                                <div className="ui input registerTextfield"><input size="50" placeholder="Username" style={{backgroundColor: "var(--secondary)"}}/></div>
                                <div className="ui input registerTextfield"><input size="50" placeholder="Email" style={{backgroundColor: "var(--secondary)"}}/></div>
                                <div className="ui input registerTextfield"><input size="50" placeholder="Password" style={{backgroundColor: "var(--secondary)"}}/></div>
                            </Modal.Content>
                            <Modal.Actions className="recoverPasswordModalButtonContainer">
                                <Button inverted color='red' onClick={() => setRegisterModalOpenState(false)}><Icon name='remove'/>Close</Button>
                                <Button className="ui primary button" onClick={() => sendRecoveryEmail()}><Icon name='checkmark'/>Create Account</Button>
                            </Modal.Actions>
                        </Modal>
                    </div>
                </div>

                <ThemePicker />

            </header>
        </div>
    );
};

export default SplashScreen;