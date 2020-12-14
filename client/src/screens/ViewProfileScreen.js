import React, { useState, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import "../styles/css/index.css"
import { Link } from "react-router-dom";
// import jsonData from "../data/TestData.json"
import { getAlbumTime } from "../UtilityComponents/Playlist";
import { GET_USER_PLAYLISTS } from '../cache/mutations';
import { GET_DB_PLAYLISTS } from '../cache/queries';
import { flowRight as compose } from 'lodash';
import { graphql } from '@apollo/react-hoc';
import { FOLLOWUSER, UNFOLLOWUSER } from '../cache/mutations';

const arrayToString = (array) => {
    let str = "";
    for (let element of array)
        str += element + ", ";
    if (str.length >= 1 && str.charAt(str.length - 1) === " ")
        str = str.substring(0, str.length - 2);
    return str;
}

const ViewProfileScreen = (props) => {
    console.log(props);
    

    // const { refetch } = useQuery(GET_DB_PLAYLISTS);
    const [admin, setAdmin] = useState(false);

    useEffect(() => {
        async function loadPlaylists() {
            if (!props.location.user) {
                console.log("no props");
                props.history.push("/profile");
            } else {
                const { data } = await props.getUserPlaylists({ variables: { owner: props.location.user.username } });
                // console.log(data);
                setPlaylists(data.getUserPlaylists);
            }

            if (props.location.admin){
                setAdmin(true);
            }
        }
        loadPlaylists();
    }, [props.location.user]);

    console.log(props);
    let user = props.location.user;
    const [playlists, setPlaylists] = useState([]);


    const currentUser = props.location.currentUser;
    // const [following, setFollowing] = ([]);
    const [following, setFollowing] = useState(currentUser?.following);
    const [follow, setFollow] = useState(following?.includes(props.location.user._id) ? "Unfollow" : "Follow");
    // const [follow, setFollow] = useState(following.includes)
    // const user = props.location.user;

    console.log(props);


    const followUser = async (otherUser) => {
        setFollowing(prevFollowing => [...prevFollowing, otherUser._id]);
        console.log("About to follow", otherUser.username);
        const { data } = await props.followuser({ variables: { _id: currentUser._id, _otherID: otherUser._id } })
        if (data) console.log("successfully added", otherUser.username)
        else console.log("couldn't add", otherUser.username)
        props.fetchUser()
        setFollow("Unfollow");
    }

    const unfollowUser = async (otherUser) => {
        setFollowing(following.filter(id => id !== otherUser._id));
        console.log("About to unfollow", otherUser.username);
        const { data } = await props.unfollowuser({ variables: { _id: currentUser._id, _otherID: otherUser._id } })
        if (data) console.log("successfully removed", otherUser.username)
        else console.log("couldn't remove", otherUser.username)
        props.fetchUser()
        setFollow("Follow");
    }

    const invalidImage = (e) => {
        e.target.src = "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?b=1&k=6&m=1223671392&s=612x612&w=0&h=5VMcL3a_1Ni5rRHX0LkaA25lD_0vkhFsb1iVm1HKVSQ=";
    }
    if (!props.location.user) {
        return <></>;
    }
    console.log(admin);
    return (
        <div className="viewProfileScreenOutermost">
            <div className="profileContainerLeft">
                <div className="profileContainerTop">
                    <img onError={invalidImage} style={{ objectFit: "cover" }} src={user ? user.profilePicture : invalidImage} className="myProfilePicture" alt="" />
                    <div className="profileName"><p>{user.username}</p></div>
                </div>
                <div className="viewProfileInfoBackground">
                    <p className="viewProfileScreenLabel">Bio</p>
                    <div className="viewProfileTextArea" >{user.bio ? user.bio : "None"}</div>
                    <p className="viewProfileScreenLabel">Location</p>
                    <div className="viewProfileTextArea" >{user.location ? user.location : "None"}</div>
                    <p className="viewProfileScreenLabel">Favorite Genres</p>
                    <div className="viewProfileTextArea" >{(arrayToString(user.favoriteGenres) === "") ? "None" : arrayToString(user.favoriteGenres)}</div>
                    <p className="viewProfileScreenLabel">Favorite Artists</p>
                    <div className="viewProfileTextArea" >{(arrayToString(user.favoriteArtists) === "") ? "None" : arrayToString(user.favoriteArtists)}</div>
                    <div className="followButtonContainer">
                        {!admin ? following.includes(user._id) ?
                            <button className="userFollowButton clickButton ui icon big button" onClick={() => unfollowUser(user)}>
                                {follow}
                            </button> :
                            <button className="userFollowButton clickButton ui icon big button" onClick={() => followUser(user)}>
                                {follow}
                                {/* follow */}
                            </button>
                            : <div />}
                        {/* <button className="clickButton ui button massive" onClick>{follow}</button> */}
                    </div>
                </div>
            </div>

            <div className="profileRightScrollContainer">
                <div className="profileContainerRight" style={{ backgroundColor: "var(--background)" }}>
                    <Grid columns={2} divided>
                        <Grid.Row>
                            {playlists.map((playlist, index) => (
                                <Grid.Column key={index}>
                                    <Link to={{ pathname: "/viewplaylist/" + playlist.owner + '/' + playlist.id, playlist: playlist }}>
                                        <div className='viewProfilePlaylists'>
                                            <img className="viewProfilePlaylistPic" src={playlist.picture} alt="" />
                                            <div className='viewProfilePlaylistInfo'>
                                                <h2 className="playlistTitleText">{playlist.name}</h2>
                                                <p className="playlistSubText">{playlist.songs.length} song{playlist.songs.length === 1 ? "" : "s"}, {getAlbumTime(playlist.songs)}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </Grid.Column>
                            ))}
                        </Grid.Row>
                    </Grid>
                </div>
            </div>
        </div>
    );
};

export default compose(
    graphql(GET_USER_PLAYLISTS, { name: 'getUserPlaylists' }),
    graphql(GET_DB_PLAYLISTS, { name: "getDBPlaylists" }),
    (graphql(FOLLOWUSER, { name: 'followuser' })),
    (graphql(UNFOLLOWUSER, { name: 'unfollowuser' })),
)(ViewProfileScreen);