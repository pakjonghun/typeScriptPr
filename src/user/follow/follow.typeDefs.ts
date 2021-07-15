import { gql } from "apollo-server";

export default gql`
  type FollowResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    follow(userName: String!): FollowResult!
  }
`;
