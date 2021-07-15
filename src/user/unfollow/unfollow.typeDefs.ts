import { gql } from "apollo-server-express";

export default gql`
  type UnFollowResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    unFollow(userName: String!): UnFollowResult!
  }
`;
