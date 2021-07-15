import { gql } from "apollo-server-express";

export default gql`
  type SearchUserResult {
    ok: Boolean!
    result: [User]
    error: String
  }

  type Query {
    searchUser(cursor: Int, term: String!): SearchUserResult
  }
`;
