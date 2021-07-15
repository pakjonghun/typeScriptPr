import { isType } from "graphql";
import { Resolvers } from "../types";

const resolvers: Resolvers = {
  Query: {
    searchUser: async (_, { term, cursor }, { client }) => {
      try {
        console.log(1);
        console.log(term, cursor);
        const result = await client.user.findMany({
          take: 5,
          skip: 1,
          ...(cursor && { cursor: { id: cursor } }),
          where: { userName: { contains: term.toLowerCase() } },
        });
        console.log(result);

        return {
          ok: true,
          result,
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
