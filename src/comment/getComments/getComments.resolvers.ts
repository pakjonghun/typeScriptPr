import { Resolvers } from "../../user/types";

const resolvers: Resolvers = {
  Query: {
    getComments: async (_, { photoId, cursor }, { client }) => {
      try {
        const comments = await client.comment.findMany({
          take: 5,
          ...(cursor && { cursor: { id: cursor } }),
          skip: cursor ? 1 : 0,
          where: { photoId },
        });
        return {
          ok: true,
          data: comments,
        };
      } catch (e) {
        console.log(e);

        return {
          ok: false,
          error: "알수없는 오류가 발생했습니다. 관리자에게 문의하세요.",
        };
      }
    },
  },
};

export default resolvers;
