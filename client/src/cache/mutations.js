import gql from "graphql-tag";

// ------------- User Mutations --------------//

export const LOGIN = gql`
    mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            _id
            username
            password
        }
    }
`;

export const REGISTER = gql`
    mutation Register($username: String!, $email: String!, $password: String!) {
        register(username: $username, email: $email, password: $password) {
            _id
            username
            email
            password
        }
    }
`;

export const LOGOUT = gql`
	mutation Logout {
		logout 
	}
`;