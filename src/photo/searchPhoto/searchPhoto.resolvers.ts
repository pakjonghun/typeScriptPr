import { Resolvers } from "../../user/types";

const resolvers: Resolvers = {
  Query: {
    searchPhoto: async (_, { term, cursor }, { client }) => {
      try {
        const photosOne = await client.photo.findMany({
          take: 5,
          ...(cursor && { skip: 1, cursor: { id: cursor } }),
          where: { caption: { contains: term } },
        });

        return {
          ok: true,
          result: photosOne,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "알수없는 오류가 발생했습니다.",
        };
      }
    },
  },
};

export default resolvers;
