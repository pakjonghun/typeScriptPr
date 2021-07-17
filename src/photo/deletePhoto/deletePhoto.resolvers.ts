import { protectResolver } from "../../user/user.utils";

export default {
  Mutation: {
    deletePhoto: protectResolver(
      async (_, { photoId }, { client, loggedUser }) => {
        try {
          const photoExist = await client.photo.findFirst({
            where: { id: photoId },
            select: {
              userId: true,
            },
          });
          if (!photoExist) {
            return {
              ok: false,
              error: "포토가 없습니다.",
            };
          }

          if (photoExist.userId !== loggedUser.id) {
            return {
              ok: false,
              error: "삭제권한이 없습니다.",
            };
          }

          await client.photo.delete({ where: { id: photoId } });
          return {
            ok: true,
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
