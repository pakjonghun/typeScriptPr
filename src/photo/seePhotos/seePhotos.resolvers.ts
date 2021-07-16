import { protectResolver } from "../../user/user.utils";

const resolvers = {
  Query: {
    seePhotos: protectResolver(async (root, _, { loggedUser, client }) => {
      try {
        const photos = await client.photo.findMany({
          where: { userId: loggedUser.id },
        });

        return {
          ok: true,
          result: photos,
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
