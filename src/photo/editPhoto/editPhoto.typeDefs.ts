import { gql } from "apollo-server-express";

export default gql`
  type EditPhotoResult {
    ok: Boolean
    error: String
    result: Photo
  }

  type Mutation {
    editPhoto(id: Int!, caption: String, file: Upload): EditPhotoResult!
  }
`;
