import React, { useState }  from 'react';
import { Grid, Button, Icon, Modal, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import "../../styles/css/index.css";
import { graphql } from '@apollo/react-hoc';
import { flowRight as compose } from 'lodash';
import { GETUSERBYUSERNAME } from '../../cache/mutations';
import jsonData from "../../data/TestData.json";
import UserSearch from "../../UtilityComponents/UserSearch";


const Followers = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [userSearchOpenState, setUserSearchOpenState] = useState(false);
  const users = jsonData.Users;
  const columns = 2;

  const searchUser = async (searchTerm) => {
    const {data} = await props.getuserbyusername({ variables: { username: searchTerm}})
    // console.log(data);
    if (data && data.getUserByUsername) {
      console.log(data.getUserByUsername);
      if (data.getUserByUsername.length === 0) {
        console.log("No followers found");
        return;
      }
      props.history.push({ pathname: "/profile/" + data.getUserByUsername[0]._id, user: data.getUserByUsername[0] });
    }
    else
      console.log("No followers found");
  }

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
    if (event.key === 'Enter') {
        searchUser(event.target.value);
    }
  }

  return (
    <div className="profileScreenMainContainerFollowing">
      <div className="followingSearchContainer ui input">
      <input placeholder="Filter followers..." style={{ backgroundColor: "var(--secondary)" }} size="50" className="discoverSearch"
           onKeyUp={(e) => handleSearchInput(e)} />
        <button type="submit" className="clickButton ui icon big button" onClick={() => searchUser(searchTerm)}>
          <i className="search icon"></i>
        </button>
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
          <Modal
            onClose={() => setUserSearchOpenState(false)}
            onOpen={() => setUserSearchOpenState(true)}
            open={Boolean(userSearchOpenState)}
            size='large'
            trigger={
              <Grid.Column width={Math.floor(16 / columns)}>
              <div className="searchForUserButton">
                <button className="clickButton ui massive button">Search for User</button>
              </div>
            </Grid.Column>}>
            <Header icon>Find New User</Header>
            <Modal.Content>
                <UserSearch {...props}></UserSearch>
            </Modal.Content>
            <Modal.Actions className="recoverPasswordModalButtonContainer">
                <Button inverted color='red' onClick={(e) => setUserSearchOpenState(false)}><Icon name='close' />Close</Button>
            </Modal.Actions>
          </Modal>
        </Grid>
      </div>
    </div>
  )
} 
export default compose(
  (graphql(GETUSERBYUSERNAME, { name: 'getuserbyusername' }))
)(Followers);

