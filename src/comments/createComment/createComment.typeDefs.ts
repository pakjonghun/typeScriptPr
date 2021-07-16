import { gql } from "apollo-server-express";

export default gql`
  type createCommentResult {
    ok: Boolean!
    error: String
    data: Comment
  }

  type Mutation {
    createComment(description: String!): createCommentResult!
  }
`;
