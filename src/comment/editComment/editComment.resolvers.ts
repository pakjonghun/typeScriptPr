import { protectResolver } from "../../user/user.utils";

export default {
  Mutation: {
    editComment: protectResolver(
      async (_, { description, commentId }, { loggedUser, client }) => {
        try {
          const commentExist = await client.comment.findUnique({
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
              error: "수정권한이 없습니다.",
            };
          }

          const editedComment = await client.comment.update({
            where: {
              id: commentId,
            },
            data: {
              description,
            },
          });

          return {
            ok: true,
            data: editedComment,
          };
        } catch (e) {
          console.log(e);
          return {
            ok: false,
            error: "알수없는 오류 발생",
          };
        }
      }
    ),
  },
};
