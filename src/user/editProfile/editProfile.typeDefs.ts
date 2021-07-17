import { gql } from "apollo-server";

export default gql`
  type Mutation {
    editProfile(
      userName: String
      password: String
      firstName: String
      email: String
      lastName: String
      avatar: Upload
      bio: String
    ): MutationResponse!
  }
`;
