import { gql } from "apollo-server";

export default gql`
  type Mutation {
    follow(userName: String!): MutationResponse!
  }
`;
