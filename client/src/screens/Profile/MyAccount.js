import React, { useState } from 'react';
import "../../styles/css/index.css";
import { graphql } from '@apollo/react-hoc';
import { flowRight as compose } from 'lodash';
import { UPDATEUSERACCOUNT } from '../../cache/mutations';

const MyAccount = (props) => {
    const currentUser = props.user;
    const [username, setUsername] = useState(currentUser.username);
    const [email, setEmail] = useState(currentUser.email);
    const [newPassword, setNewPassword] = useState("");
    const [confirmedNewPassword, setConfirmedNewPassword] = useState("");

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
                <p className="profileAccountSubText" onClick={updateAccount}>change</p>
            </div>
            <p className="profileScreenSubText">Email</p>
            <div className="ui input profileInputContainer">
                <input className="profileInput" style={{ backgroundColor: "var(--secondary)" }} 
                    value={email} onChange={(e) => setEmail(e.target.value)} />
                <p className="profileAccountSubText" onClick={updateAccount}>change</p>
            </div>
            <p className="profileScreenSubText">New Password</p>
            <div className="ui input profileInputContainer">
                <input className="profileInput" style={{ backgroundColor: "var(--secondary)" }}
                    value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                <p className="profileAccountSubText" onClick={updateAccount}>change</p>
            </div>
            <p className="profileScreenSubText">Confirm New Password</p>
            <div className="ui input profileInputContainer">
                <input className="profileInput" style={{ backgroundColor: "var(--secondary)" }}
                    value={confirmedNewPassword} onChange={(e) => setConfirmedNewPassword(e.target.value)} />
                <p className="profileAccountSubText" onClick={updateAccount}>change</p>
            </div>
        </div>
    )
}

export default compose(
    (graphql(UPDATEUSERACCOUNT, { name: 'updateuseraccount' }))
) (MyAccount)