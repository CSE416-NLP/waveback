const { gql } = require("apollo-server");
// const GraphQLJSON = require('graphql-type-json');

const typeDefs = gql `

    type Playlist {
        _id: String!
        key: Int!
        owner: String!
        name: String!
        picture: String
        description: String
        songs: [Song]!
        followers: Int!
        date_created: String!
        visibility: String!
        tags: [String]
        duration: Int
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
        addSong(song: SongInput!, _id: String!): String
        addPlaylist(playlist: PlaylistInput!): String
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
        followers: Int
        date_created: String
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