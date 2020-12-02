import React, { useState } from 'react';
import { Grid, Button, Icon, Modal, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import "../../styles/css/index.css";
import { graphql } from '@apollo/react-hoc';
import { flowRight as compose } from 'lodash';
import { GETUSERBYUSERNAME, FOLLOWUSER } from '../../cache/mutations';
import jsonData from "../../data/TestData.json";


const Following = (props) => {
  const user = props.user
  const [filterTerm, setFilterTerm] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [userSearchOpenState, setUserSearchOpenState] = useState(false);
  const users = jsonData.Users;
  const columns = 2;

  const searchUser = async (searchTerm) => {
    const { data } = await props.getuserbyusername({ variables: { username: searchTerm } })
    if (data && data.getUserByUsername) {
      console.log(data.getUserByUsername)
      props.history.push({ pathname: "/profile/" + data.getUserByUsername[0]._id, user: data.getUserByUsername[0] });
    }
    else
      console.log("No users found")
  }

  const followUser = async () => {
    console.log("About to follow lebron", user._id);
    const { data } = await props.followuser({ variables: { _id: user._id, _otherID: "5fa49dd3430a003cc0205725" } })
    if (data) console.log("successfully added lebron")
    else console.log("couldn't add lebron")
    
    // props.fetchUser();
  }

  return (
    <div className="profileScreenMainContainerFollowing">
      <div className="followingSearchContainer ui input">
        <input placeholder="Search for a user..." style={{ backgroundColor: "var(--secondary)" }} size="50" className="discoverSearch"
          value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <button type="submit" className="clickButton ui icon big button" onClick={() => searchUser(searchTerm)}>
          <i className="search icon"></i>
        </button>
      </div>
      <div className="followingSearchContainer ui input">
        <input placeholder="Filter following..." style={{ backgroundColor: "var(--secondary)" }} size="50" className="discoverSearch"
          value={filterTerm} onChange={(e) => setFilterTerm(e.target.value)} />
        <button onClick={followUser}>follow lebron</button>
      </div>
      <div className="profileScreenScrollContainer">
        <Grid columns={columns} divided>
          {users.map((user, index) => (
            <Grid.Column width={Math.floor(16 / columns)} key={index}>
              <Link className="profileScreenFollowing" to={{ pathname: "/profile/" + user._id, user: user }}>
                <img className="profilePicture" src={user.profilePicture} alt="" />
                <div className='profileFollowingInfo'>
                  <h2>{user.username}</h2>
                </div>
              </Link>
            </Grid.Column>
          ))}
          <Grid.Column width={Math.floor(16 / columns)}>
            <div className="searchForUserButton">
              <button className="clickButton ui massive button">Search for User</button>
            </div>
          </Grid.Column>



        </Grid>

      </div>
    </div>
  )
}
export default compose(
  (graphql(GETUSERBYUSERNAME, { name: 'getuserbyusername' })),
  (graphql(FOLLOWUSER, { name: 'followuser' }))
)(Following);
