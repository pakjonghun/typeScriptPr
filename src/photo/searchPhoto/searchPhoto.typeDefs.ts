import { gql } from "apollo-server-express";

export default gql`
  type searchPhotoResult {
    ok: Boolean!
    error: String
    result: [Photo]
  }

  type Query {
    searchPhoto(term: String!, cursor: Int): searchPhotoResult!
  }
`;
