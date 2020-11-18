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

// ========== Playlist Queries ========== //

export const GET_DB_PLAYLISTS = gql`
    query GetDBPlaylists {
        getAllUserPlaylists {
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