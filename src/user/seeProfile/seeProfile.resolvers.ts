import { Resolvers } from "../types";

const resolvers: Resolvers = {
  Query: {
    getProfile: async (_, { userName }, { client }) => {
      try {
        const user = await client.user.findUnique({
          where: { userName },
          include: {
            followings: true,
            followers: true,
          },
        });
        console.log(user);
        return user;
      } catch (e) {
        console.log(e);
      }
    },
  },
};

export default resolvers;
