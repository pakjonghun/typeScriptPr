import { gql } from "apollo-server-express";

export default gql`
  type seePhotosResult {
    ok: Boolean!
    result: [Photo]
    error: String
  }

  type Query {
    seePhotos: seePhotosResult!
  }
`;
