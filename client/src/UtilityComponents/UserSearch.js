import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../styles/css/index.css";

// Widget that displays all public users.
const UserSearch = (props) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [userResults, setUserResults] = useState([]);
    const [searchedYetState, setSearchedYetState] = useState(false);

    const searchUser = async (searchTerm) => {
        setSearchedYetState(true);
        const {data} = await props.getuserbyusername({ variables: { username: searchTerm}})
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

    const handleSearchInput = (event) => {
        setSearchTerm(event.target.value);
        if (event.key === 'Enter') {
            searchUser(event.target.value);
        }
    }

    const followUser = async (user) => {
        console.log("About to follow ", user.usernamed);
        const { data } = await props.followuser({ variables: { _id: user._id, _otherID: "5fa49dd3430a003cc0205725" } })
        if (data) console.log("successfully added lebron")
        else console.log("couldn't add lebron")
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
                        <Link className="userResultsFollowing" to={{ pathname: "/profile/" + user._id, user: user }}>
                            <div className="userResultContainer">
                                <div className="userResultProfilePicture">
                                    <img className="userResultPfpImg" src={user.profilePicture} alt="" />
                                </div>
                                <div className="userResultInfo">
                                    <div className="userResultUsername">{user.username}</div>
                                    <div className="userResultInfo">{user.bio}</div>
                                    <div className="userResultInfo" style={{fontStyle: "italic"}}>{user.location}</div>
                                    
                                </div>
                            </div>
                        </Link>
                        <div className="userResultFollowInfo">
                            <div className="userResultFollowerInfo">
                                {(user.followers.length !== 1) ? (user.followers.length + " followers") : (user.followers.length + " follower")}
                            </div>
                            <button className="userFollowButton clickButton ui icon big button" onClick={() => followUser(user)}>
                                Follow
                            </button>
                        </div>                  
                    </div>
                    
                )) : (searchedYetState) ? <h2 className="noUsersFound">No Users Found :(</h2> : <div></div>}
            </div>
        </div>
    //     <div className="displaySearchResultsContainer2">
    //     <div className="displaySearchResultsContainer">
    //         {
    //             searchResults.map((song, index) => (
    //                 <div className="playlistSearchResultBox" key={index}>
    //                     <div className="playlistSearchResult">
    //                         <div className="playlistSongSearchResultImage">
    //                             <img className="searchResultImg" src={song.album.images[0].url} alt="" />
    //                         </div>
    //                         <div className="playlistSongSearchResultInfo">
    //                             <div className="playlistSongSearchResultTitle">{song.name}</div>
    //                             <div className="playlistSongSearchResultDesc">{song.artists[0].name}</div>
    //                         </div>
    //                     </div>
    //                     <div className="playlistSearchResultOptions">
    //                         <Modal
    //                             onClose={() => setSongInfoOpenState(false)}
    //                             onOpen={() => setSongInfoOpenState(song)}
    //                             open={Boolean(songInfoOpenState)}
    //                             size='small'
    //                             trigger={
    //                                 <button className="searchResultOptionButton clickButton ui icon button" >
    //                                     <Icon className="info circle"></Icon>
    //                                 </button>}>
    //                             <Header icon>Song Info</Header>
    //                             <Modal.Content>
    //                                 <div className="moreInfoContainer">
    //                                     <img className="playlistSRRArt" src={songInfoOpenState ? songInfoOpenState.album.images[0].url : ""} alt="" />
    //                                     <div>
    //                                         <div className="playlistSRRTitle">{songInfoOpenState ? songInfoOpenState.name : ""}</div>
    //                                         <div className="playlistSRRArtist">{songInfoOpenState ? songInfoOpenState.artists[0].name : ""}</div>
    //                                         <div className="playlistSRRAlbum">{
    //                                             songInfoOpenState ? songInfoOpenState.album.name + ", " + songInfoOpenState.album.release_date.substring(0, 4) : ""
    //                                         }</div>
    //                                         <br></br>
    //                                         <div className="playlistSRRDuration">{
    //                                             songInfoOpenState ? "Duration: " + getSongTime(Math.round(songInfoOpenState.duration_ms / 1000)) : ""
    //                                         }</div>
    //                                     </div>
    //                                 </div>
    //                             </Modal.Content>
    //                             <Modal.Actions className="recoverPasswordModalButtonContainer">
    //                                 <Button inverted color='red' onClick={(e) => setSongInfoOpenState(false)}><Icon name='close' />Close</Button>
    //                             </Modal.Actions>
    //                         </Modal>
    //                         <button className="searchResultOptionButton clickButton ui icon button" onClick={() => playSongByURI(song.uri)} >
    //                             <Icon className="play circle"></Icon>
    //                         </button>
    //                         <button className="searchResultOptionButton clickButton ui icon button" onClick={() => addSong(song)} >
    //                             <Icon className="plus circle"></Icon>
    //                         </button>
    //                     </div>
    //                 </div>
    //             ))}
    //     </div>
    // </div>
    )
}
export default UserSearch;