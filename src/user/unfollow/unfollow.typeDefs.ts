import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    unFollow(userName: String!): MutationResponse!
  }
`;
