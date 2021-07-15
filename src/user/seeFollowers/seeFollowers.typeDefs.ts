import { gql } from "apollo-server-express";

export default gql`
  type seeFollowersResult {
    ok: Boolean!
    followers: [User]
    totalPages: Int
    error: String
  }

  type Query {
    seeFollowers(userName: String!, page: Int!): seeFollowersResult!
  }
`;
