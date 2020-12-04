import gql from "graphql-tag";

//------------ User Queries ------------//

export const GET_DB_USER = gql`
    query getDBUser {
        getCurrentUser {
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

export const GET_FOLLOWERS = gql`
    query getDBFollowers($followers: [String]) {
        getFollowers(followers: $followers) {
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

export const GET_FOLLOWING = gql`
    query getDBFollowing($following: [String]) {
        getFollowing(following: $following) {
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

// ========== Playlist Queries ========== //

export const GET_DB_PLAYLISTS = gql`
    query GetDBPlaylists {
        getAllPublicPlaylists {
            _id
            key
            owner
            name
            picture
            description
            songs {
                _id
                songURI
                key
                title
                artist
                album
                genre
                year
                duration
            }
            songURIs
            followers
            createdAt
            visibility
            tags
            duration
        }
    }
`;