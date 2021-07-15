import { protectResolver } from "../user.utils";

const resolvers = {
  Mutation: {
    unFollow: protectResolver(
      async (_, { userName }, { client, loggedUser }) => {
        try {
          const userExists = await client.user.findUnique({
            where: { userName },
          });
          if (!userExists) {
            return {
              ok: false,
              error: "해당 사용자의 계정이 존재하지 않습니다.",
            };
          }

          await client.user.update({
            where: { id: loggedUser.id },
            data: { followings: { disconnect: { userName } } },
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
      }
    ),
  },
};

export default resolvers;
