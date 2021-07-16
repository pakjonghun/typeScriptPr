import { protectResolver } from "../../user/user.utils";

const resolvers = {
  Query: {
    seePhotoLikes: protectResolver(
      async (_, { id }, { client, loggedUser }) => {
        const users = await client.user.findMany({
          where: { likes: { some: { photoId: id } } },
        });

        return {
          ok: true,
          result: users,
        };
      }
    ),
  },
};

export default resolvers;
