const { gql } = require("apollo-server");

const typeDefs = gql`
    type User {
        _id: String
        username: String
        email: String
        password: String
        admin: Boolean
        profilePicture: String
        playlists: [String]
        following: [String]
        bio: String
        location: String
        favoriteGenres: [String]
        favoriteArtists: [String]
        favoriteSongs: [String]
        defaultVisibility: String
        theme: String
    }
    extend type Query {
        getCurrentUser: User
        testQuery: String
    }
    extend type Mutation {
        login(username: String!, password: String!): User
        register(username: String!, email: String!, password: String!): User
        logout: Boolean!
        getUserByUsername(username: String!): [User]
        updateUserProfile(_id: String!, bio: String, location: String, favoriteGenres: [String], favoriteArtists: [String], favoriteSongs: [String], profilePicture: String): Boolean
        updateUserAccount(_id: String!, username: String!, email: String!, password: String): Boolean
        updateUserTheme(_id: String!, theme: String!): Boolean
    }
`;

module.exports = { typeDefs: typeDefs }