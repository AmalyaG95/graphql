import { gql } from '@apollo/client';

const GET_USERS_QUERY = gql`
    query {
        users {
            id
            name
            bestFriend {
                id
                name
            }
        }
    }
`;

const GET_USER_QUERY = gql`
    query($id: ID) {
        user(id: $id) {
            id
            name
            bestFriend {
                id
                name
                users {
                    id
                    name
                }
            }
        }
    }
`;

const GET_FRIENDS_QUERY = gql`
    query {
        friends {
            id
            name
        }
    }
`;

const ADD_USER_MUTATION = gql`
    mutation($name: String!, $bestFriendId: String!) {
        addUser(name: $name, bestFriendId: $bestFriendId)  {
            id
            name
        }
    }
`;

const EDIT_USER_MUTATION = gql`
    mutation($id: String!, $name: String!, $bestFriendId: String!) {
        editUser(id: $id, name: $name, bestFriendId: $bestFriendId)  {
            message
        }
    }
`;

const DELETE_USER_MUTATION = gql`
    mutation($id: String!) {
        deleteUser(id: $id)  {
            successful
            message
        }
    }
`;

export {
    GET_USERS_QUERY,
    GET_USER_QUERY,
    GET_FRIENDS_QUERY,

    ADD_USER_MUTATION,
    EDIT_USER_MUTATION,
    DELETE_USER_MUTATION,
}