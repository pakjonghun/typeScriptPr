import { gql } from "apollo-server-express";

export default gql`
  type likeResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    like(photoId: Int!): likeResult!
  }
`;
