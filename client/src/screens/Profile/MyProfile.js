import { Modal, Form, TextArea, Button, Icon, Header } from 'semantic-ui-react';
import React, { useState } from 'react';
import "../../styles/css/index.css";
import { graphql } from '@apollo/react-hoc';
import { flowRight as compose } from 'lodash';
import { UPDATEUSERPROFILE } from '../../cache/mutations';

const stringToArray = (str) => {
    if (!str) return [];
    let splitString = str.split(",");
    let len = splitString.length;
    for (let i = 0; i < len; i++) {
        splitString[i] = splitString[i].trim();
    }
    if (splitString[len - 1] === "")
        splitString.pop();
    return splitString;
}

const arrayToString = (array) => {
    let str = "";
    for (let element of array)
        str += element + ",";
    if (str.length >= 1 && str.charAt(str.length - 1) === ",")
        str = str.substring(0, str.length - 1);
    return str;
}

const MyProfile = (props) => {
    console.log(props);
    const currentUser = props.user
    const [bio, setBio] = useState(currentUser.bio)
    const [avatarOpenState, setAvatarModalOpenState] = useState(false);
    const [profilePicture, setProfilePicture] = useState(currentUser.profilePicture);
    const [location, setLocation] = useState(currentUser.location)
    const [favoriteGenres, setFavoriteGenres] = useState(arrayToString(currentUser.favoriteGenres))
    const [favoriteArtists, setFavoriteArtists] = useState(arrayToString(currentUser.favoriteArtists))
    const [favoriteSongs, setFavoriteSongs] = useState(arrayToString(currentUser.favoriteSongs))

    const updateProfile = async () => {
        // Split the strings by comma separators and then remove excess whitespace (not inbetween words)
        let parsedGenres = stringToArray(favoriteGenres)
        let parsedArtists = stringToArray(favoriteArtists)
        let parsedSongs = stringToArray(favoriteSongs)

        setAvatarModalOpenState(false);

        const updated = await props.updateuserprofile({
            variables: {
                _id: currentUser._id,
                bio,
                location,
                favoriteGenres: parsedGenres,
                favoriteArtists: parsedArtists,
                favoriteSongs: parsedSongs,
                profilePicture: profilePicture,
            }
        });
        if (updated) console.log("Saved successfully");
        else console.log("Error in saving");
        props.fetchUser();
    }

    return (
        <div className="myProfileScreen">
            <div className="profileScreenMainContainer">
                <p className="profileScreenSubText">Bio</p>
                <Form><TextArea className="profileTextArea" rows={6} style={{ backgroundColor: "var(--secondary)" }} placeholder="Tell us about yourself!"
                    value={bio} onChange={(e) => setBio(e.target.value)} />
                </Form>
                <p className="profileScreenSubText">Location</p>
                <Form><TextArea className="profileTextArea" rows={1} style={{ backgroundColor: "var(--secondary)" }} placeholder="Where do you call home?"
                    value={location} onChange={(e) => setLocation(e.target.value)} />
                </Form>
                <p className="profileScreenSubText">Favorite Genres</p>
                <Form><TextArea className="profileTextArea" rows={1} style={{ backgroundColor: "var(--secondary)" }} placeholder="What are some of your favorite genres?"
                    value={favoriteGenres} onChange={(e) => setFavoriteGenres(e.target.value)} /></Form>
                <p className="profileScreenSubText">Favorite Artists</p>
                <Form><TextArea className="profileTextArea" rows={1} style={{ backgroundColor: "var(--secondary)" }} placeholder="Who are some of your favorite artists?"
                    value={favoriteArtists} onChange={(e) => setFavoriteArtists(e.target.value)} /></Form>
                <p className="profileScreenSubText">Favorite Songs</p>
                <Form><TextArea className="profileTextArea" rows={1} style={{ backgroundColor: "var(--secondary)" }} placeholder="What are some of your favorite songs?"
                    value={favoriteSongs} onChange={(e) => setFavoriteSongs(e.target.value)} /></Form>
                <div className="profileScreenUpdateButton">
                    <button className="clickButton ui huge button" onClick={updateProfile}>Update</button>
                </div>
            </div>
            <div className="profileScreenChangeAvatarContainer">
                <img style={{ objectFit: "cover" }} src={currentUser ? currentUser.profilePicture : "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?b=1&k=6&m=1223671392&s=612x612&w=0&h=5VMcL3a_1Ni5rRHX0LkaA25lD_0vkhFsb1iVm1HKVSQ="} className="myProfilePicture" alt="r" />
                <h2>{currentUser.username}</h2>
                <Modal
                    basic
                    onClose={() => setAvatarModalOpenState(false)}
                    onOpen={() => setAvatarModalOpenState(true)}
                    open={avatarOpenState}
                    size='small'
                    trigger={<button className="clickButton changeProfileButton ui huge button">Change Avatar</button>}>
                    <Header icon><Icon name='user circle' />Update Avatar</Header>
                    <Modal.Content>
                        <div className="ui input changeAvatarTextField">
                            <input size="50" onChange={(e) => setProfilePicture(e.target.value)} placeholder="URL" style={{ backgroundColor: "var(--secondary)" }} />
                        </div>
                    </Modal.Content>
                    <Modal.Actions className="recoverPasswordModalButtonContainer">
                        <Button inverted color='red' onClick={(e) => setAvatarModalOpenState(false)}><Icon name='remove' />Close</Button>
                        <Button className="ui primary button" onClick={updateProfile}><Icon name='checkmark' />Update</Button>
                    </Modal.Actions>
                </Modal>
            </div>
        </div>

    )
}
export default compose
    (graphql(UPDATEUSERPROFILE, { name: 'updateuserprofile' }))
    (MyProfile);