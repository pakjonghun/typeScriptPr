import { gql } from "apollo-server-express";

export default gql`
  type Comment {
    id: Int!
    createdAt: String!
    updatedAt: String!
    description: String!
    photo: Photo!
    user: User!
    userId: Int!
    photoId: Int!

    isMine: Boolean!
  }
`;
