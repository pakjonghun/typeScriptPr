import { gql } from "apollo-server-express";

export default gql`
  type editCommentResult {
    ok: Boolean!
    error: String
    data: Comment
  }

  type Mutation {
    editComment(description: String!, commentId: Int!): editCommentResult!
  }
`;
