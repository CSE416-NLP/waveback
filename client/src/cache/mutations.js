import gql from "graphql-tag";

// ------------- User Mutations --------------//

export const LOGIN = gql`
    mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            _id
            username
            email
            admin
            profilePicture
            playlists
            following
            followers
            bio
            location
            favoriteGenres
            favoriteArtists
            favoriteSongs
            defaultVisibility
            theme
        }
    }
`;

export const REGISTER = gql`
    mutation Register($username: String!, $email: String!, $password: String!) {
        register(username: $username, email: $email, password: $password) {
            _id
            username
            email
            admin
            profilePicture
            playlists
            following
            followers
            bio
            location
            favoriteGenres
            favoriteArtists
            favoriteSongs
            defaultVisibility
            theme
        }
    }
`;

export const LOGOUT = gql`
	mutation Logout {
		logout 
	}
`;

// This "query" doesn't need all the fields, so it doesn't ask for all of them!
export const GETUSERBYUSERNAME = gql`
    mutation GetUserByUsername($username: String!) {
        getUserByUsername(username: $username) {
            _id
            username
            profilePicture
            playlists
            following
            followers
            bio
            location
            favoriteGenres
            favoriteArtists
            favoriteSongs
        }
    }
`;


export const UPDATEUSERPROFILE = gql`
    mutation UpdateUserProfile($_id: String!, $bio: String, $location: String, $favoriteGenres: [String], $favoriteArtists: [String], $favoriteSongs: [String], $profilePicture: String) {
        updateUserProfile(_id: $_id, bio: $bio, location: $location, favoriteGenres: $favoriteGenres, favoriteArtists: $favoriteArtists, favoriteSongs: $favoriteSongs, profilePicture: $profilePicture)
    }
`;

export const UPDATEUSERACCOUNT = gql`
    mutation UpdateUserAccount($_id: String!, $username: String!, $email: String!, $password: String) {
        updateUserAccount(_id: $_id, username: $username, email: $email, password: $password)
    }
`;

export const UPDATEUSERTHEME = gql`
    mutation UpdateUserTheme($_id: String!, $theme: String!) {
        updateUserTheme(_id: $_id, theme: $theme)
    }
`;

export const UPDATEUSERDEFAULTVISIBILITY = gql`
    mutation UpdateUserDefaultVisibility($_id: String!, $defaultVisibility: String!) {
        updateUserDefaultVisibility(_id: $_id, defaultVisibility: $defaultVisibility)
    }
`;

export const FOLLOWUSER = gql`
    mutation FollowUser($_id: String!, $_otherID: String!){
        followUser(_id: $_id, _otherID: $_otherID)
    }
`;

export const DELETE_USER = gql`
    mutation DeleteUser($_id: String!){
        deleteUser(_id: $id)
    }
`;


// ========= Playlist Mutations ========== //

export const ADD_PLAYLIST = gql`
    mutation AddPlaylist($playlist: PlaylistInput!){
        addPlaylist(playlist: $playlist)
    }
`;

export const UPDATE_PLAYLIST = gql`
    mutation UpdatePlaylist($_id: String!, $name: String, $picture: String, $description: String, $songs: [SongInput], $songURIs: [String], $tags: [String], $duration: Int){
        updatePlaylist(_id: $_id, name: $name, picture: $picture, description: $description, songs: $songs, songURIs: $songURIs, tags: $tags, duration: $duration)
    }
`;
export const DELETE_PLAYLIST = gql`
    mutation DeletePlaylist($_id: String!){
        deletePlaylist(_id: $_id)
    }
`;
export const DELETE_ALL_PLAYLISTS = gql`
    mutation DeleteAllPlaylists{
        deleteAllPlaylists
    }
`;