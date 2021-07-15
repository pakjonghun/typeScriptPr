import { GraphQLUpload } from "graphql-upload";
import { Resolvers } from "./types";

const resolvers: Resolvers = {
  Upload: GraphQLUpload,

  User: {
    totalFollower: ({ id }, {}, { client }) =>
      client.user.count({ where: { followings: { some: { id } } } }),

    totalFollowing: ({ id }, {}, { client }) =>
      client.user.count({ where: { followers: { some: { id } } } }),
    isFollowing: async (root, {}, { client, loggedUser }) => {
      if (!loggedUser) {
        return false;
      }
      const result = await client.user.count({
        where: { followings: { some: { id: root.id } } },
      });
      return !!result;
    },
    isMe: ({ id }, _, { loggedUser }) => {
      if (!loggedUser) {
        return false;
      }
      return id === loggedUser.id;
    },
  },
};

export default resolvers;
