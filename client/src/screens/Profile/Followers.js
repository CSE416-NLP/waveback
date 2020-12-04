import React, { useState }  from 'react';
import { Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import "../../styles/css/index.css";
import jsonData from "../../data/TestData.json";

const Followers = (props) => {
  const [filter, setFilter] = useState("");
  const users = jsonData.Users;
  const columns = 2;

  return (
    <div className="profileScreenMainContainerFollowing">
      <div className="followingSearchContainer ui input">
      <input placeholder="Filter followers..." style={{ backgroundColor: "var(--secondary)" }} size="50" className="discoverSearch"
           onChange={(e) => setFilter(e.target.value)} />
        <button type="submit" className="clickButton ui icon big button">
          <i className="search icon"></i>
        </button>
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
        </Grid>
      </div>
    </div>
  )
} 
export default Followers;

