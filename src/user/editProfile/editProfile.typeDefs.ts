import { gql } from "apollo-server";

export default gql`
  type EditProfileResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    editProfile(
      userName: String
      password: String
      firstName: String
      email: String
      lastName: String
      avatar: Upload
      bio: String
    ): EditProfileResult!
  }
`;
