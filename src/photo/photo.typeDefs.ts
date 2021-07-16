import { gql } from "apollo-server-express";

export default gql`
  type Photo {
    id: Int!
    createdAt: String!
    updatedAt: String!
    file: Upload!
    caption: String
    userId: Int!
    user: User
    hashtags: [Hashtag]
    likeCount: Int!
  }

  type Hashtag {
    id: Int!
    createdAt: String!
    updatedAt: String!
    hashtag: String!
    photos(cursor: Int!): [Photo]
    totalPhotos: Int!
  }

  type Like {
    id: Int!
    createdAt: String!
    updatedAt: String!
    user: User
    userId: Int!
    photo: Photo
    photoId: Int!
  }
`;

//무조건 해쉬태그를 같이 포토와 묶는것이 아니라
//의존성 정도와 다른 모듈과 의존성 에 따라서 나누거나 합쳐야 한다.
//comment가 해쉬테그와 의존성이 있으니 커멘트를 여기에 합칠 건지 셋다 다로 만들건지 고민해야 한다.
//like 의 경우 커멘트와 포토와 의존성이 있으니 별도로 만들어야 한다ㅏ.
