import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { graphql } from '@apollo/react-hoc';
import { flowRight as compose } from 'lodash';
import { GET_FOLLOWERS } from '../../cache/queries';
import "../../styles/css/index.css";


const Followers = (props) => {
  const [filter, setFilter] = useState("");
  const [followers, setFollowers] = useState([]);
  const columns = 2;
  const { loading, error, data } = useQuery(GET_FOLLOWERS, { variables: { followers: props.user.followers } }); // Can add refetch

  useEffect(() => {
    if (error) { console.log("ERROR:\n", error); }
    if (loading) { console.log("Loading followers") }
    if (data && data.getFollowers) {
      console.log("Finished loading followers:", data);
      setFollowers(data.getFollowers)
    }
  }, [data, error, loading])

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
          {followers.filter(user => user.username.toLowerCase().substring(0, filter.length).includes(filter.toLowerCase())).map((user, index) => (
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
export default compose(
  (graphql(GET_FOLLOWERS, { name: 'getfollowers' }))
)(Followers);
