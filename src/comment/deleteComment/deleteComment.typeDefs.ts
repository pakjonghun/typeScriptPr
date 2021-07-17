import { gql } from "apollo-server-express";

export default gql`
  type deleteCommentResult {
    ok: Boolean!
    error: String
    data: Comment
  }

  type Mutation {
    deleteComment(commentId: Int!): deleteCommentResult!
  }
`;
