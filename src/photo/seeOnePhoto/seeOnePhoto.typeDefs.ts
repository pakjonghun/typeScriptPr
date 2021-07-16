import { gql } from "apollo-server-express";

export default gql`
  type seeOnePhotoResult {
    ok: Boolean!
    error: String
    result: Photo
  }

  type Query {
    seeOnePhoto(id: Int!): seeOnePhotoResult!
  }
`;
