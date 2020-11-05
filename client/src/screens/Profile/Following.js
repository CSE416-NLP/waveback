import { Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import React  from 'react';
import "../../styles/css/index.css";
import jsonData from "../../TestData.json";

const Following = (props) => {
  const users = jsonData.Users;
  const columns = 2;
  console.log(users);
  return (
    <div className="profileScreenMainContainerFollowing">
      <div className="followingSearchContainer ui input">
        <input placeholder="Search for a user..." style={{ backgroundColor: "var(--secondary)" }} size="50" className="discoverSearch"></input>
        <button style={{ color: "var(--background)", backgroundColor: "var(--buttonColor" }} type="submit" className="ui icon big button">
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

export default Following