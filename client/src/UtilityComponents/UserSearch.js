import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { graphql } from '@apollo/react-hoc';
import { flowRight as compose } from 'lodash';
import { FOLLOWUSER, UNFOLLOWUSER, GETUSERBYUSERNAME } from '../cache/mutations';
import "../styles/css/index.css";

// Widget that displays all public users.
const UserSearch = (props) => {
    // console.log(props);
    const currentUser = props.user;
    const [following, setFollowing] = useState(currentUser.following);
    const [searchTerm, setSearchTerm] = useState("");
    const [userResults, setUserResults] = useState([]);
    const [searchedYetState, setSearchedYetState] = useState(false);

    const searchUser = async (searchTerm) => {
        setSearchedYetState(true);
        const { data } = await props.getuserbyusername({ variables: { username: searchTerm } })
        if (data && data.getUserByUsername) {
            if (data.getUserByUsername.length === 0) {
                setUserResults([]);
            }
            else {
                setUserResults(data.getUserByUsername);
            }
        }
        else { console.log("No followers found"); }
        console.log(data.getUserByUsername);
    }

    const followUser = async (otherUser) => {
        setFollowing(prevFollowing => [...prevFollowing, otherUser._id]);
        console.log("About to follow", otherUser.username);
        const { data } = await props.followuser({ variables: { _id: currentUser._id, _otherID: otherUser._id } })
        if (data) console.log("successfully added", otherUser.username)
        else console.log("couldn't add", otherUser.username)
        props.fetchUser()
        // setNumFollowers(numFollowers + 1);
    }

    const unfollowUser = async (otherUser) => {
        setFollowing(following.filter(id => id !== otherUser._id));
        console.log("About to unfollow", otherUser.username);
        const { data } = await props.unfollowuser({ variables: { _id: currentUser._id, _otherID: otherUser._id } })
        if (data) console.log("successfully removed", otherUser.username)
        else console.log("couldn't remove", otherUser.username)
        props.fetchUser()
        // setNumFollowers(numFollowers - 1);
    }
    const handleSearchInput = (event) => {
        setSearchTerm(event.target.value);
        if (event.key === 'Enter') {
            searchUser(event.target.value);
        }
    }

    return (
        <div className="userSearch">
            <div className="userSearchTopBar ui input">
                <input placeholder="Search for a user..." style={{ backgroundColor: "var(--secondary)" }} size="50" className="discoverSearch"
                    onKeyPress={(e) => handleSearchInput(e)} />
                <button type="submit" className="clickButton ui icon big button" onClick={() => searchUser(searchTerm)}>
                    <i className="search icon"></i>
                </button>
            </div>
            <div className="userSearchDivider"></div>
            <div className="userSearchResults">
                {(userResults.length > 0) ? userResults.map((user, index) => (

                    <div className="userResultContainer2" key={index}>
                        <Link className="userResultsFollowing" to={{ pathname: "/profile/" + user._id, user: user, currentUser: currentUser }}>
                            <div className="userResultContainer">
                                <div className="userResultProfilePicture">
                                    <img className="userResultPfpImg" src={user.profilePicture} alt="" />
                                </div>
                                <div className="userResultInfo">
                                    <div className="userResultUsername">{user.username}</div>
                                    <div className="userResultInfo">{user.bio}</div>
                                    <div className="userResultInfo" style={{ fontStyle: "italic" }}>{user.location}</div>

                                </div>
                            </div>
                        </Link>
                        <div className="userResultFollowInfo">
                            <div className="userResultFollowerInfo">
                                {/* {(user.followers.length !== 1) ? (user.followers.length + " followers") : (user.followers.length + " follower")} */}
                            </div>
                            {following.includes(user._id) ? 
                            <button className="userFollowButton clickButton ui icon big button" onClick={() => unfollowUser(user)}>
                                Unfollow
                            </button> :
                            <button className="userFollowButton clickButton ui icon big button" onClick={() => followUser(user)}>
                                Follow
                            </button>}
                        </div>
                    </div>

                )) : (searchedYetState) ? <h2 className="noUsersFound">No Users Found :(</h2> : <div></div>}
            </div>
        </div>
    )
}
export default compose(
    (graphql(FOLLOWUSER, { name: 'followuser' })),
    (graphql(UNFOLLOWUSER, { name: 'unfollowuser' })),
    (graphql(GETUSERBYUSERNAME, { name: 'getuserbyusername' }))
)(UserSearch);