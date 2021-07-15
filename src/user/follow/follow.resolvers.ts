import { Resolvers } from "../types";
import { protectResolver } from "../user.utils";

const resolvers = {
  Mutation: {
    follow: protectResolver(async (_, { userName }, { loggedUser, client }) => {
      try {
        const exist = await client.user.findUnique({ where: { userName } });
        if (!exist) {
          return {
            ok: false,
            error: "존재하지 않는 유저 입니다.",
          };
        }

        await client.user.update({
          where: { id: loggedUser.id },
          data: {
            followings: {
              connect: { userName },
            },
          },
        });

        return {
          ok: true,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "알수없는 오류가 발생했습니다.",
        };
      }
    }),
  },
};

export default resolvers;
