import { gql } from "apollo-server-express";

export default gql`
  type seeFollowingsResult {
    ok: Boolean!
    error: String
    followings: [User]
  }

  type Query {
    seeFollowings(userName: String!, item: Int): seeFollowingsResult!
  }
`;
