import { gql } from "apollo-server-express";

export default gql`
  type getCommentsResult {
    ok: Boolean!
    error: String
    data: [Photo]
  }

  type Query {
    getComments(photoId: Int!, cursor: Int): getCommentsResult!
  }
`;
