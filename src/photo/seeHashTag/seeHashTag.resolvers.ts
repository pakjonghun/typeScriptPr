import { Resolvers } from "../../user/types";

const resolvers: Resolvers = {
  Query: {
    seeHashTag: async (_, { term }, { client, loggedUser }) => {
      const tempTag = term[0] !== "#" ? "#" + term : term;
      const result = await client.hashtag.findUnique({
        where: { hashtag: tempTag },
      });

      return {
        ok: true,
        result,
      };
    },
  },
};

export default resolvers;
