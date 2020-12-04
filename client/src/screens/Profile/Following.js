import React, { useState } from 'react';
import { Grid, Button, Icon, Modal, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import "../../styles/css/index.css";
import { graphql } from '@apollo/react-hoc';
import { flowRight as compose } from 'lodash';
import { FOLLOWUSER } from '../../cache/mutations';
import jsonData from "../../data/TestData.json";
import UserSearch from "../../UtilityComponents/UserSearch";

const Following = (props) => {
  const user = props.user
  const [filter, setFilter] = useState("");
  const [userSearchOpenState, setUserSearchOpenState] = useState(false);
  const users = jsonData.Users;
  const columns = 2;

  const followUser = async () => {
    console.log("About to follow lebron", user._id);
    const { data } = await props.followuser({ variables: { _id: user._id, _otherID: "5fa49dd3430a003cc0205725" } })
    if (data) console.log("successfully added lebron")
    else console.log("couldn't add lebron")
  }

  return (
    <div className="profileScreenMainContainerFollowing">
      <div className="followingSearchContainer ui input">
        <input placeholder="Filter following..." style={{ backgroundColor: "var(--secondary)" }} size="50" className="discoverSearch"
          value={filter} onChange={(e) => setFilter(e.target.value)} />
        <button onClick={followUser}>follow lebron</button>
      </div>
      <div className="profileScreenScrollContainer">
        <Grid columns={columns} divided>
          {users.filter(user => user.username.toLowerCase().substring(0, filter.length).includes(filter.toLowerCase())).map((user, index) => (
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
  (graphql(FOLLOWUSER, { name: 'followuser' }))
)(Following);
