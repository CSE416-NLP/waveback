import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Button, Icon, Modal, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import "../../styles/css/index.css";
import { GET_FOLLOWING } from '../../cache/queries';
import UserSearch from "../../UtilityComponents/UserSearch";

const Following = (props) => {
  const user = props.user;
  const [following, setFollowing] = useState([]);
  const { loading, error, data } = useQuery(GET_FOLLOWING, { variables: { following: props.user.following } }); // Can add refetch
  const [filter, setFilter] = useState("");
  const [userSearchOpenState, setUserSearchOpenState] = useState(false);
  const columns = 2;

  useEffect(() => {
    if (error) { console.log("ERROR:\n", error); }
    if (loading) { console.log("Loading following") }
    if (data && data.getFollowing) {
      console.log("Finished loading following:", data.getFollowing);
      setFollowing(data.getFollowing)
    }
  }, [data, error, loading])

  return (
    <div className="profileScreenMainContainerFollowing">
      <div className="followingSearchContainer ui input">
        <input placeholder="Filter following..." style={{ backgroundColor: "var(--secondary)" }} size="50" className="discoverSearch"
          value={filter} onChange={(e) => setFilter(e.target.value)} />
      </div>
      <div className="profileScreenScrollContainer">
        <Grid columns={columns} divided>
          {following.filter(user => user.username.toLowerCase().substring(0, filter.length).includes(filter.toLowerCase())).map((user, index) => (
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
              <UserSearch fetchUser={props.fetchUser} user={user}></UserSearch>
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
export default Following;
