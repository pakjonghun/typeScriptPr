import { gql } from "apollo-server-express";

export default gql`
  type seeHashTagResult {
    ok: Boolean!
    error: String
    result: Hashtag
  }

  type Query {
    seeHashTag(term: String!, cursor: Int): seeHashTagResult!
  }
`;
