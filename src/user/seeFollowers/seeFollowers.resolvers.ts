import { Resolvers } from "../types";
import { protectResolver } from "../user.utils";

const resolvers: Resolvers = {
  Query: {
    seeFollowers: async (_, { userName, page }, { client, loggedUser }) => {
      try {
        const isUserExist = await client.user.findUnique({
          where: { userName },
          select: { id: true },
        });

        console.log(isUserExist);

        if (!isUserExist) {
          return {
            ok: false,
            error: "No User",
          };
        }

        const take = 1;
        const skip = take * (page - 1);

        const aUser = await client.user.findMany({
          take,
          skip,
          where: {
            followings: {
              some: { userName },
            },
          },
        });

        const userNumber = await client.user.count({
          where: { followers: { some: { userName } } },
        });

        return {
          ok: true,
          followers: aUser,
          totalPages: Math.ceil(userNumber / take),
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "알수없는 에러가 발생했습니다.",
        };
      }
    },
  },
};

export default resolvers;
