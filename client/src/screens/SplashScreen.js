import React, { useState } from 'react';
import { Modal, Button, Header, Icon, Popup } from 'semantic-ui-react'
import '../styles/css/index.css';
import wavebackTextFG from '../images/waveback text fg.png';
import wavebackTextBG from '../images/waveback text bg.png';
import ThemePicker from '../UtilityComponents/ThemePicker';
import { REGISTER, LOGIN } from '../cache/mutations';
import { graphql } from '@apollo/react-hoc';
import { flowRight as compose } from 'lodash';
import { Link } from 'react-router-dom';



const SplashScreen = (props) => {
    const [passwordOpenState, setPasswordModalOpenState] = useState(false);

    // Login hooks
    const [loginInput, setLoginInput] = useState({ username: "", password: "" });
    const [passwordFieldType, setPasswordFieldType] = useState("password");
    const [loginError, setLoginError] = useState(false);

    // Register hooks
    const [registerOpenState, setRegisterModalOpenState] = useState(false);
    const [registerInput, setRegisterInput] = useState({ username: "", email: "", password: "" });
    const [registerError, setRegisterError] = useState(false);

    const updateLoginInput = (e) => {
        const { name, value } = e.target;
        const updated = { ...loginInput, [name]: value };
        setLoginError(false);
        setLoginInput(updated);
    }

    const login = async (e) => {
        const { data } = await props.login({ variables: { ...loginInput } });
        if (data && data.login._id === null) {
            console.log(data)
            setLoginError(data.login.username);
        }
        else if (data) {
            props.fetchUser();
        };
    };

    const updateRegisterInput = (e) => {
        const { name, value } = e.target;
        const updated = { ...registerInput, [name]: value };
        setRegisterError(false);
        setRegisterInput(updated);
    }

    const CreateNewAccount = async () => {
        const { data } = await props.register({ variables: { ...registerInput } });
        if (data && data.register._id === null) {
            console.log("oops!", data)
            setRegisterError(data.register.username);
        }
        else if (data) {
            props.fetchUser();
        };
    }

    const toggleShowPassword = () => {
        if (passwordFieldType === "password")
            setPasswordFieldType("text")
        else
            setPasswordFieldType("password")
    }

    return (
        <div className="App">
            <header className="App-header" style={{ backgroundColor: "var(--background)" }}>
                <p className="app_logo_container">
                    <img src={wavebackTextBG} className="appLogoBG" alt="" />
                    <img src={wavebackTextFG} className="appLogoFG" alt="" style={{ filter: "hue-rotate(var(--hue))" }} />
                </p>
                <div className="splashLoginContainer" >
                    <p className="splashTextSubtitle" style={{ color: "var(--accent)" }}>
                        waveback is a simple, yet powerful, playlist creation tool.<br />relive the sounds of the past like never before.
                    </p>
                    <div className="splashLoginBox" style={{ backgroundColor: "var(--primary)" }}>
                        <div className="splashText" style={{ color: "var(--accent)" }}>Sign In</div>
                        <form style={{ maxWidth: "min-content " }} onSubmit={(e) => {
                            e.preventDefault()
                            login()
                            return false
                        }}>
                            <div className="ui input splashInputContainer">
                                <input size="25" className="splashInput" placeholder="Username" style={{ backgroundColor: "var(--secondary)" }}
                                    name="username" onChange={updateLoginInput}
                                    style={{ color: loginError ? "red" : "", backgroundColor: loginError ? "rgba(255, 170, 170, 0.9)" : "" }} />
                            </div>
                            <div className="ui input splashInputContainer">
                                <input size="25" className="splashInput" placeholder="Password" style={{ backgroundColor: "var(--secondary)" }}
                                    type={passwordFieldType} name="password" onChange={updateLoginInput}
                                    style={{ color: loginError ? "red" : "", backgroundColor: loginError ? "rgba(255, 170, 170, 0.9)" : "" }} />
                                <Popup content="Toggle password visibility"
                                    trigger={<Icon style={{ marginLeft: "10px", marginTop: "5px" }} onClick={() => toggleShowPassword()} name={passwordFieldType === "password" ? 'eye' : 'eye slash'} />}
                                />
                            </div>
                            {loginError && <div style={{ color: "red", marginTop: "10px", fontSize: "12pt", fontWeight: "bold" }}>{loginError}</div>}
                            <Modal
                                basic
                                onClose={() => setPasswordModalOpenState(false)}
                                onOpen={() => setPasswordModalOpenState(true)}
                                open={passwordOpenState}
                                size='small' trigger={<div className="splashTextSmall">Forgot Password?</div>}>
                                <Header icon><Icon name='question circle' />Password Recovery</Header>
                                <Modal.Content>
                                    <div className="ui input recoverPasswordTextfield">
                                        <input size="50" placeholder="Email" style={{ backgroundColor: "var(--secondary)" }} />
                                    </div>
                                </Modal.Content>
                                <Modal.Actions className="recoverPasswordModalButtonContainer">
                                    <Button inverted color='red' onClick={() => setPasswordModalOpenState(false)}><Icon name='remove' />Close</Button>
                                    <Button className="ui primary button"><Icon name='checkmark' />Send Recovery Email</Button>
                                </Modal.Actions>
                            </Modal>
                            <div>
                                <Button type="submit" className="clickButton ui huge button" onClick={login}>Log In</Button>
                            </div>
                        </form>
                        <Modal
                            basic
                            onClose={() => setRegisterModalOpenState(false)}
                            onOpen={() => setRegisterModalOpenState(true)}
                            open={registerOpenState}
                            size='small' trigger={<div className="splashTextSmall">Create Account</div>}>
                            <Header icon><Icon name='user plus' />Create New Account</Header>
                            <Modal.Content>
                                <div className="ui input registerTextfield">
                                    <input size="50" placeholder="Username" style={{ backgroundColor: "var(--secondary)" }} name="username" onChange={updateRegisterInput} />
                                </div>
                                <div className="ui input registerTextfield">
                                    <input size="50" placeholder="Email" style={{ backgroundColor: "var(--secondary)" }} name="email" onChange={updateRegisterInput} />
                                </div>
                                <div className="ui input registerTextfield" style={{ alignContent: "baseline" }}>
                                    <input size="50" placeholder="Password" style={{ backgroundColor: "var(--secondary)" }}
                                        type={passwordFieldType} name="password" onChange={updateRegisterInput} />
                                    <Icon style={{ marginLeft: "10px", marginTop: "5px", color: "white", fontSize: "15pt" }} onClick={() => toggleShowPassword()}
                                        name={passwordFieldType === "password" ? 'eye' : 'eye slash'} />
                                </div>
                                {registerError && <div style={{ color: "red", marginTop: "10px", fontSize: "12pt", fontWeight: "bold", left: "22%", position: "relative" }}>{registerError}</div>}

                            </Modal.Content>
                            <Modal.Actions className="recoverPasswordModalButtonContainer">
                                <Button inverted color='red' onClick={() => setRegisterModalOpenState(false)}><Icon name='remove' />Close</Button>
                                <Button className="ui primary button" onClick={CreateNewAccount}><Icon name='checkmark' />Create Account</Button>
                            </Modal.Actions>
                        </Modal>
                    </div>
                </div>

                <ThemePicker />

            </header>
        </div>
    );
};

export default compose(
    graphql(REGISTER, { name: 'register' }),
    graphql(LOGIN, { name: 'login' })
)(SplashScreen);