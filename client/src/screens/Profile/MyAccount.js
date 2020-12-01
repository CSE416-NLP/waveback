import React, { useState } from 'react';
import "../../styles/css/index.css";
import { graphql } from '@apollo/react-hoc';
import { flowRight as compose } from 'lodash';
import { UPDATEUSERACCOUNT } from '../../cache/mutations';
import { Modal, Button, Icon, Header } from 'semantic-ui-react';
import PrivacyPicker from "../../UtilityComponents/PrivacyPicker.js";


const MyAccount = (props) => {
    const currentUser = props.user;
    const [username, setUsername] = useState(currentUser.username);
    const [email, setEmail] = useState(currentUser.email);
    const [newPassword, setNewPassword] = useState("");
    const [confirmedNewPassword, setConfirmedNewPassword] = useState("");
    const [updateCheck, setUpdateCheck] = useState(false);
    const [passwordFieldType, setPasswordFieldType] = useState("password");
    const [errorText, setErrorText] = useState(null);

    const toggleShowPassword = () => {
        if (passwordFieldType === "password")
            setPasswordFieldType("text")
        else
            setPasswordFieldType("password")
    }

    const updateAccount = async () => {
        console.log("updateAccount");
        const updated = await props.updateuseraccount({ variables: { _id: currentUser._id, username, email, password: newPassword } });
        if (updated) console.log("Saved successfully");
        else console.log("Error in saving");
        setUpdateCheck(false);
        props.fetchUser();
    }

    const validateInput = () => {
        if (newPassword !== confirmedNewPassword) {
            setErrorText("New password and new password confirmation must match!");
        }
        else if (!username || !email) {
            setErrorText("Must input a value for username and email!")
        }
        else {
            setUpdateCheck(true)
        }
    }

    return (
        <div className="profileScreenMainContainer">
            <p className="profileScreenSubText">Username</p>
            <div className="ui input profileInputContainer">
                <input className="profileInput" style={{ backgroundColor: "var(--secondary)" }}
                    value={username} onChange={(e) => {
                        setErrorText(null)
                        setUsername(e.target.value)
                    }} />
            </div>
            <p className="profileScreenSubText">Email</p>
            <div className="ui input profileInputContainer">
                <input className="profileInput" style={{ backgroundColor: "var(--secondary)" }}
                    value={email} onChange={(e) => {
                        setErrorText(null);
                        setEmail(e.target.value)
                    }} />
            </div>
            <p className="profileScreenSubText">New Password</p>
            <div className="ui input profileInputContainer">
                <input className="profileInput" style={{ backgroundColor: "var(--secondary)" }} type={passwordFieldType}
                    value={newPassword} onChange={(e) => {
                        setErrorText(null)
                        setNewPassword(e.target.value)
                    }} />
                <Icon style={{ marginLeft: "10px", marginTop: "5px", color: "var(--accent)", fontSize: "15pt" }}
                    name={passwordFieldType === "password" ? 'eye' : 'eye slash'} onClick={() => toggleShowPassword(!passwordFieldType)} />
            </div>
            <p className="profileScreenSubText">Confirm New Password</p>
            <div className="ui input profileInputContainer">
                <input className="profileInput" style={{ backgroundColor: "var(--secondary)" }} type={passwordFieldType}
                    value={confirmedNewPassword} onChange={(e) => {
                        setErrorText(null)
                        setConfirmedNewPassword(e.target.value)
                    }} />
                <Icon style={{ marginLeft: "10px", marginTop: "5px", color: "var(--accent)", fontSize: "15pt" }}
                    name={passwordFieldType === "password" ? 'eye' : 'eye slash'} onClick={() => toggleShowPassword(!passwordFieldType)} />
            </div>
            {errorText && <div style={{ color: "red", marginTop: "10px", fontSize: "12pt", fontWeight: "bold" }}>{errorText}</div>}
            <p className="profileScreenSubText">User Account Privacy</p>
            <div className="accountPrivacyPicker"><PrivacyPicker ></PrivacyPicker></div>

            <Modal
                basic
                onClose={() => setUpdateCheck(false)}
                onOpen={() => setUpdateCheck(true)}
                open={updateCheck}
                size='small'>
                <Header icon>Are you sure you want to update your account information?</Header>
                <Modal.Actions className="recoverPasswordModalButtonContainer">
                    <Button className="ui primary button" onClick={updateAccount}><Icon name='checkmark' />Update</Button>
                    <Button inverted color='red' onClick={(e) => setUpdateCheck(false)}><Icon name='remove' />Close</Button>
                </Modal.Actions>
            </Modal>
            <div className="profileScreenUpdateButton">
                <button className="clickButton ui huge button" onClick={validateInput}>Update</button>
            </div>
        </div>
    )
}

export default compose(
    (graphql(UPDATEUSERACCOUNT, { name: 'updateuseraccount' }))
)(MyAccount)