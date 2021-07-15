import { gql } from "apollo-server";

export default gql`
  scalar Upload
  type User {
    id: Int!
    firstName: String!
    lastName: String!
    userName: String!
    email: String!
    password: String!
    avatar: Upload
    bio: String
    followings: [User]
    followers: [User]
    totalFollower: Int!
    totalFollowing: Int!
    isFollowing: Boolean!
    isMe: Boolean!
  }
`;
