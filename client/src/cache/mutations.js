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

// ========= Playlist Mutations ========== //

export const ADD_PLAYLIST = gql`
    mutation AddPlaylist($playlist: PlaylistInput!){
        addPlaylist(playlist: $playlist)
    }
`;

export const UPDATE_PLAYLIST = gql`
    mutation UpdatePlaylist($_id: String!, $name: String, $picture: String, $description: String){
        updatePlaylist(_id: $_id, name: $name, picture: $picture, description: $description)
    }
`;
export const DELETE_PLAYLIST = gql`
    mutation DeletePlaylist($_id: String!){
        deletePlaylist(_id: $_id)
    }
`;