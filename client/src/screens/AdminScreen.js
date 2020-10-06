import React from 'react';
import { Link } from 'react-router-dom';

const AdminScreen = (props) => {
  console.log(props)
  return (
    <div className="App">
      <p>This is the admin control panel. This should be changed so it is only accessable from admin accounts</p>
      <p>TEST APIs</p>
      {props.location.beter && <p>BETER ZENG HAHA</p>}
      <Link to="/">Go back home</Link>
    </div>
  );
};

export default AdminScreen;