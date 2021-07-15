import { Resolvers } from "../types";

const resolvers: Resolvers = {
  Query: {
    seeFollowings: async (_, { userName, item }, { client, loggedUser }) => {
      try {
        const userExist = await client.user.count({ where: { userName } });

        if (!userExist) {
          return {
            ok: false,
            error: "NoUser",
          };
        }

        const take = 1;
        const skip = 1;

        const followings = await client.user.findMany({
          where: { followers: { some: { userName } } },
          take,
          skip,
          ...(item && { cursor: { id: item } }),
        });

        return {
          ok: true,
          followings,
        };
      } catch (e) {
        console.log(e);
        return { ok: false, error: "알수없는 오류가 발생했습니다." };
      }
    },
  },
};

export default resolvers;
