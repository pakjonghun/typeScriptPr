import { Resolvers } from "../user/types";

const resolvers: Resolvers = {
  Photo: {
    user: ({ userId }, _, { client }) =>
      client.user.findUnique({ where: { id: userId } }),
    hashtags: (root, _, { client }) =>
      client.hashtag.findMany({ where: { photos: { some: { id: root.id } } } }),
    likeCount: (root, _, { client }) =>
      client.like.count({ where: { photoId: root.id } }),
    isMine: (root, _, { loggedUser }) =>
      loggedUser ? loggedUser.id === root.userId : false,
    comments: (root, _, { client, loggedUser }) =>
      client.comment.count({ where: { photoId: root.id } }),
  },

  Hashtag: {
    photos: async ({ id }, { cursor }, { client }) => {
      return await client.photo.findMany({
        take: 5,
        skip: 1,
        cursor: { id: cursor },
        where: { hashtags: { some: { id } } },
      });
    },

    totalPhotos: ({ hashtag }, _, { client }) =>
      client.photo.count({ where: { hashtags: { some: { hashtag } } } }),
  },
};

export default resolvers;
