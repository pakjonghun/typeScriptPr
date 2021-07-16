import { gql } from "apollo-server-express";

export default gql`
  type seeFeedResult {
    ok: Boolean!
    error: String
    result: [Photo]
    totalPage: Int
  }

  type Query {
    seeFeed(page: Int): seeFeedResult!
  }
`;
