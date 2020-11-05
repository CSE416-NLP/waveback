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