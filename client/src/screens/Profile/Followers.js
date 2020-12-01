import React, { useState }  from 'react';
import { Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import "../../styles/css/index.css";
import { graphql } from '@apollo/react-hoc';
import { flowRight as compose } from 'lodash';
import { GETUSERBYUSERNAME } from '../../cache/mutations';
import jsonData from "../../data/TestData.json";


const Followers = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const users = jsonData.Users;
  const columns = 2;

  const searchUser = async (searchTerm) => {
    const {data} = await props.getuserbyusername({ variables: { username: searchTerm}})
    if (data && data.getUserByUsername) {
      console.log(data.getUserByUsername)
      props.history.push({ pathname: "/profile/" + data.getUserByUsername[0]._id, user: data.getUserByUsername[0] });
    }
    else
      console.log("No users found")
  }

  return (
    <div className="profileScreenMainContainerFollowing">
      <div className="followingSearchContainer ui input">
        <input placeholder="Filter followers..." style={{ backgroundColor: "var(--secondary)" }} size="50" className="discoverSearch"
          value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <button type="submit" className="clickButton ui icon big button" onClick={() => searchUser(searchTerm)}>
          <i className="search icon"></i>
        </button>
      </div>
      <div className="profileScreenScrollContainer">
        <Grid columns={columns} divided>
          {users.map((user, index) => (
            <Grid.Column width={Math.floor(16 / columns)} key={index}>
              <Link className="profileScreenFollowing" to={{ pathname: "/profile/" + user._id, user: user }}>

                <img className="profilePicture" src={user.profile_picture} alt="" />
                <div className='profileFollowingInfo'>
                  <h2>{user.username}</h2>
                </div>
              </Link>
            </Grid.Column>
          ))}
        </Grid>
      </div>
    </div>
  )
} 
export default compose(
  (graphql(GETUSERBYUSERNAME, { name: 'getuserbyusername' }))
)(Followers);
