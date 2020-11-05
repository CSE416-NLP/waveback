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
    mutation UpdateUserProfile($_id: String!, $bio: String, $location: String, $favoriteGenres: [String], $favoriteArtists: [String], $favoriteSongs: [String]) {
        updateUserProfile(_id: $_id, bio: $bio, location: $location, favoriteGenres: $favoriteGenres, favoriteArtists: $favoriteArtists, favoriteSongs: $favoriteSongs)
    }
`;