const { gql } = require("apollo-server");
// const GraphQLJSON = require('graphql-type-json');

const typeDefs = gql `
    scalar Date
    
    type Playlist {
        _id: String!
        key: Int!
        owner: String!
        name: String!
        picture: String
        description: String
        songs: [Song]!
        songURIs: [String]!
        followers: Int!
        visibility: String!
        tags: [String]
        duration: Int
        createdAt: Date
    }
    type Song {
        _id: String!
        song_id: String!
        key: Int!
        title: String!
        artist: String!
        album: String!
        genre: [String]!
        year: Int!
        duration: Int!
    }
    extend type Query {
        getAllPlaylists: [Playlist] 
        getPlaylistById(_id: String!): Playlist
    }
    extend type Mutation {
        addSong(song: SongInput!, _id: String!, uri: String!): String
        addPlaylist(playlist: PlaylistInput!): String
        updatePlaylist(_id: String!, name: String, picture: String, description: String): Boolean
        deletePlaylist(_id: String!): Boolean
    }

    input PlaylistInput {
        _id: String
        key: Int
        owner: String
        name: String
        picture: String
        description: String
        songs: [SongInput]
        songURIs: [String]
        followers: Int
        visibility: String
        tags: [String]
        duration: Int
    }

    input SongInput {
        _id: String
        song_id: String
        key: Int
        title: String
        artist: String
        album: String
        genre: [String]
        year: Int
        duration: Int
    }
`;

module.exports = { typeDefs: typeDefs }