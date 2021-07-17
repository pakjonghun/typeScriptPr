import { protectResolver } from "../../user/user.utils";

const resolvers = {
  Mutation: {
    deleteComment: protectResolver(
      async (_, { commentId }, { client, loggedUser }) => {
        try {
          const commentExist = await client.comment.findFirst({
            where: { id: commentId },
            select: { userId: true },
          });

          if (!commentExist) {
            return {
              ok: false,
              error: "댓글이 존재하지 않습니다.",
            };
          }

          if (commentExist.userId !== loggedUser.id) {
            return {
              ok: false,
              error: "권한이 없습니다.",
            };
          }

          await client.comment.delete({ where: { id: commentId } });
          return {
            ok: true,
          };
        } catch (e) {
          console.log(e);
          return {
            ok: false,
            error: "알수없는 오류가 발생",
          };
        }
      }
    ),
  },
};

export default resolvers;
