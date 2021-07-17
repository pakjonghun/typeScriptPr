import { mergeGraphQLTypes } from "graphql-tools";
import { protectResolver } from "../../user/user.utils";

export default {
  Query: {
    seeFeed: protectResolver(async (_, { page }, { client, loggedUser }) => {
      try {
        const photos = await client.photo.findMany({
          take: 5,
          skip: 5 * (page - 1),
          where: {
            OR: [
              {
                User: {
                  followers: {
                    some: {
                      id: loggedUser.id,
                    },
                  },
                },
              },
              {
                userId: loggedUser.id,
              },
            ],
          },
          orderBy: { createdAt: "desc" },
        });

        const pages = await client.photo.count({
          where: {
            OR: [
              { userId: loggedUser.id },
              { User: { followers: { some: { id: loggedUser.id } } } },
            ],
          },
        });

        return {
          ok: true,
          totalPages: Math.ceil(pages / 5),
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
