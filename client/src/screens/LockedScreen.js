import React, { useState } from 'react';
import { GET_DB_PLAYLISTS } from '../cache/queries';
import { GETUSERBYUSERNAME, DELETE_USER } from '../cache/mutations';
import jsonData from "../data/TestData.json";
import { flowRight as compose } from 'lodash';
import { graphql } from '@apollo/react-hoc';
import * as mutations from '../cache/mutations';
import { Link } from 'react-router-dom';
import { Grid, Modal, Icon, Header, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';

const ObjectId = require("mongoose").Types.ObjectId;

const LockedScreen = (props) => {
    const columns = 3;
    const playlists = jsonData.Playlists;
    const [users, setUsers] = useState([]);
    const [deleteUserOpenState, setDeleteUserOpenState] = useState(false);
    const { data, refetch } = useMutation(GETUSERBYUSERNAME);

    const showAllUsers = async (searchTerm) => {
        const { data } = await props.getuserbyusername({ variables: { username: searchTerm } })
        if (data && data.getUserByUsername) {
            if (data.getUserByUsername.length === 0) {
                setUsers([]);
            }
            else {
                setUsers(data.getUserByUsername);
            }
        }
    }

    const resetDatabasePlaylists = () => {
        props.deleteAllPlaylists({ variables: {}, refetchQueries: [{ query: GET_DB_PLAYLISTS }] });
    }

    const addPlaylistsToDatabase = () => {
        playlists.forEach(playlist => {
            let songs = playlist.songs;
            for (let i = 0; i < songs.length; i++) {
                if (!songs[i]._id)
                    songs[i]._id = new ObjectId();
            }
            const newPlaylist = {
                key: playlist.key,
                owner: playlist.owner,
                name: playlist.name,
                picture: playlist.picture,
                description: playlist.descdription,
                songs: songs,
                songURIs: playlist.songURIs,
                followers: playlist.followers,
                visibility: playlist.visibility,
                tags: playlist.tags,
                duration: playlist.duration,
            }
            for (let i = 0; i < songs.length; i++) {
                if (!songs[i]._id)
                    songs[i]._id = new ObjectId();
            }
            console.log(newPlaylist);

            props.addPlaylist({ variables: { playlist: newPlaylist }, refetchQueries: [{ query: GET_DB_PLAYLISTS }] });
        });
    }

    const deleteUser = async (user) => {
        console.log("DELETE USER: " + user.username + " WITH ID: " + user._id);
        props.deleteUser({ variables: { _id: user._id } })
        setDeleteUserOpenState(false);
        const { data } = await props.getuserbyusername({ variables: { username: "" } })
        if (data && data.getUserByUsername) {
            if (data.getUserByUsername.length === 0) {
                setUsers([]);
            }
            else {
                setUsers(data.getUserByUsername);
            }
        }
    }

    return (
        <div className="adminScreen" style={{ flex: "1", display: "flex", flexDirection: "column" }}>
            <br></br>
            <div className="adminScreenTop">
                <button className="clickButton ui button" onClick={() => addPlaylistsToDatabase()}>Add Playlists to Database</button>
                <button className="clickButton ui button" onClick={() => resetDatabasePlaylists()}>Delete All Playlists in Database</button>
                <button className="clickButton ui button" onClick={() => showAllUsers("")}>Show List of All Users</button>
                <button className="clickButton ui button" onClick={() => showAllUsers("zzwer6bcm/uilbvmx9bvx-81v")}>Hide List of All Users</button>
            </div>
            <div className="adminScreenScrollContainer">
                    <Grid columns={columns} divided>
                        {users.map((user, index) => (
                            <Grid.Column width={Math.floor(16 / columns)} key={index}>
                                <div className="adminUserList" >
                                    <img className="profilePicture" src={user.profilePicture} alt="" />
                                    <div className='profileFollowingInfo'>
                                        <h2>{user.username}</h2>
                                        <Link to={{ pathname: "/profile/" + user._id, user: user }}>
                                            <Icon className="big" name="user" ></Icon>
                                        </Link>
                                        <Modal
                                            basic
                                            onClose={() => setDeleteUserOpenState(false)}
                                            onOpen={() => setDeleteUserOpenState(user)}
                                            open={Boolean(deleteUserOpenState)}
                                            size='small'
                                            trigger={<Icon className="removeSongIcon big" name="trash"></Icon>}>
                                            <Header icon><Icon className='large trash' />
                                                Are you sure you want to delete this user?
                                                <br></br>
                                                <div className="irreversible">THIS IS NOT REVERSIBLE!</div>
                                            </Header>
                                            <Modal.Actions className="recoverPasswordModalButtonContainer">
                                                <Button className="ui primary button" onClick={() => deleteUser(deleteUserOpenState)}><Icon name='checkmark' />Yes</Button>
                                                <Button inverted color='red' onClick={() => setDeleteUserOpenState(false)}><Icon name='remove' />No</Button>
                                            </Modal.Actions>
                                        </Modal>
                                    </div>
                                </div>
                            </Grid.Column>
                        ))}
                    </Grid>
            </div>

        </div>
    );
};


export default compose(
    graphql(mutations.ADD_PLAYLIST, { name: 'addPlaylist' }),
    graphql(GET_DB_PLAYLISTS, { name: "getDBPlaylists" }),
    graphql(mutations.DELETE_ALL_PLAYLISTS, { name: "deleteAllPlaylists" }),
    graphql(DELETE_USER, { name: "deleteUser" }),
    graphql(GETUSERBYUSERNAME, { name: 'getuserbyusername' })
)(LockedScreen);