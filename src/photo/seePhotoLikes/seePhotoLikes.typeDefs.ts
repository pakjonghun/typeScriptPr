import { gql } from "apollo-server-express";

export default gql`
  type seeLikeResult {
    ok: Boolean!
    error: String
    result: [User]
  }

  type Query {
    seePhotoLikes(id: Int!): seeLikeResult!
  }
`;
