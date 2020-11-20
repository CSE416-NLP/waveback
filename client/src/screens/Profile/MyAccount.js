import React, { useState } from 'react';
import "../../styles/css/index.css";
import { graphql } from '@apollo/react-hoc';
import { flowRight as compose } from 'lodash';
import { UPDATEUSERACCOUNT } from '../../cache/mutations';
import { Modal, Button, Icon, Header } from 'semantic-ui-react';


const MyAccount = (props) => {
    const currentUser = props.user;
    const [username, setUsername] = useState(currentUser.username);
    const [email, setEmail] = useState(currentUser.email);
    const [newPassword, setNewPassword] = useState("");
    const [confirmedNewPassword, setConfirmedNewPassword] = useState("");
    const [updateCheck, setUpdateCheck] = useState(false);
    const [passwordFieldType, setPasswordFieldType] = useState("password");

    const toggleShowPassword = () => {
        if (passwordFieldType === "password")
            setPasswordFieldType("text")
        else
            setPasswordFieldType("password")
    }

    const updateAccount = async () => {
        console.log("updateAccount");
        if (newPassword !== confirmedNewPassword)
            console.log("Password and confirmation must match")
        else {
            const updated = await props.updateuseraccount({ variables: { _id: currentUser._id, username, email, password: newPassword } });
            if (updated) console.log("Saved successfully");
            else console.log("Error in saving");
            props.fetchUser();
        }
    }

    return (
        <div className="profileScreenMainContainer">
            <p className="profileScreenSubText">Username</p>
            <div className="ui input profileInputContainer">
                <input className="profileInput" style={{ backgroundColor: "var(--secondary)" }}
                    value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <p className="profileScreenSubText">Email</p>
            <div className="ui input profileInputContainer">
                <input className="profileInput" style={{ backgroundColor: "var(--secondary)" }}
                    value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <p className="profileScreenSubText">New Password</p>
            <div className="ui input profileInputContainer">
                <input className="profileInput" style={{ backgroundColor: "var(--secondary)" }} type={passwordFieldType}
                    value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                <Icon style={{ marginLeft: "10px", marginTop: "5px", color: "var(--accent)", fontSize: "15pt" }}
                    name={passwordFieldType === "password" ? 'eye' : 'eye slash'} onClick={() => toggleShowPassword(!passwordFieldType)} />
            </div>
            <p className="profileScreenSubText">Confirm New Password</p>
            <div className="ui input profileInputContainer">
                <input className="profileInput" style={{ backgroundColor: "var(--secondary)" }} type={passwordFieldType}
                    value={confirmedNewPassword} onChange={(e) => setConfirmedNewPassword(e.target.value)} />
                <Icon style={{ marginLeft: "10px", marginTop: "5px", color: "var(--accent)", fontSize: "15pt" }}
                    name={passwordFieldType === "password" ? 'eye' : 'eye slash'} onClick={() => toggleShowPassword(!passwordFieldType)} />
            </div>
            <Modal
                basic
                onClose={() => setUpdateCheck(false)}
                onOpen={() => setUpdateCheck(true)}
                open={updateCheck}
                size='small'
                trigger={<div className="profileScreenUpdateButton">
                    <button className="clickButton ui huge button" onClick={updateAccount}>Update</button>
                </div>}>
                <Header icon>Are you sure you want to update your account information?</Header>
                <Modal.Actions className="recoverPasswordModalButtonContainer">
                    <Button inverted color='red' onClick={(e) => setUpdateCheck(false)}><Icon name='remove' />Close</Button>
                    <Button className="ui primary button" onClick={updateAccount}><Icon name='checkmark' />Update</Button>
                </Modal.Actions>
            </Modal>

        </div>
    )
}

export default compose(
    (graphql(UPDATEUSERACCOUNT, { name: 'updateuseraccount' }))
)(MyAccount)