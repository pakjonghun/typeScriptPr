import { Resolvers } from "../../user/types";

const resolvers: Resolvers = {
  Query: {
    seeOnePhoto: async (_, { id }, { client }) => {
      try {
        const photo = await client.photo.findUnique({ where: { id } });

        return {
          ok: true,
          result: photo,
        };
      } catch (e) {
        console.log(e);
        return { ok: false, error: "알수없는 오류가 발생했습니다." };
      }
    },
  },
};

export default resolvers;
