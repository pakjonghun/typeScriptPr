import { gql } from "apollo-server";

export default gql`
  type Mutation {
    createAccount(
      userName: String!
      lastName: String!
      firstName: String!
      email: String!
      password: String!
      avatar: Upload
      bio: String
    ): MutationResponse!
  }
`;
