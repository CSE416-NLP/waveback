import React  from 'react';
import "../../styles/css/index.css";
import jsonData from "../../TestData.json";

const MyAccount = (props) => {
  const currentUser = jsonData.Users[0];

  return (
    <div className="profileScreenMainContainer">
      <p className="profileScreenSubText">Username</p>
      <div className="ui input profileInputContainer">
        <input disabled className="profileInput" style={{ backgroundColor: "var(--secondary)" }} defaultValue={currentUser.username} />
        <p className="profileAccountSubText">change</p>
      </div>
      <p className="profileScreenSubText">Email</p>
      <div className="ui input profileInputContainer">
        <input disabled className="profileInput" style={{ backgroundColor: "var(--secondary)" }} defaultValue={currentUser.email} />
        <p className="profileAccountSubText">change</p>
      </div>
      <p className="profileScreenSubText">New Password</p>
      <div className="ui input profileInputContainer">
        <input disabled className="profileInput" style={{ backgroundColor: "var(--secondary)" }} />
        <p className="profileAccountSubText">change</p>
      </div>
      <p className="profileScreenSubText">Confirm New Password</p>
      <div className="ui input profileInputContainer">
        <input disabled className="profileInput" style={{ backgroundColor: "var(--secondary)" }} />
        <p className="profileAccountSubText">change</p>
      </div>
    </div>
  )
}

export default MyAccount