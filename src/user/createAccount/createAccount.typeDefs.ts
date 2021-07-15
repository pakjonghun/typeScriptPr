import { gql } from "apollo-server";

export default gql`
  type createAccountResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    createAccount(
      userName: String!
      lastName: String!
      firstName: String!
      email: String!
      password: String!
      avatar: Upload
      bio: String
    ): createAccountResult!
  }
`;
