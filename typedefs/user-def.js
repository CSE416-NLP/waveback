const { gql } = require("apollo-server");

const typeDefs = gql`
    type User {
        _id: String!
        username: String!
        email: String!
        password: String!
    }
    extend type Query {
        getCurrentUser: User
        testQuery: string
    }
    extend type Mutation {
        login(username: String!, password: String!): User
        register(username: String!, email: String!, password: String!): User
        logout: Boolean!
    }
`;

module.exports = { typeDefs: typeDefs }