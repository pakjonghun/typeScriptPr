import { gql } from "apollo-server-express";

export default gql`
  type createCommentResult {
    ok: Boolean!
    error: String
    data: Comment
  }

  type Mutation {
    creatComment(photoId: Int!, description: String!): createCommentResult!
  }
`;
