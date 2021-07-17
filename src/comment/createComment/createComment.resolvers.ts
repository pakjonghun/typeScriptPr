import { protectResolver } from "../../user/user.utils";

export default {
  Mutation: {
    creatComment: protectResolver(
      async (_, { photoId, description }, { client, loggedUser }) => {
        try {
          const photoExist = await client.photo.count({
            where: { id: photoId },
          });

          if (!photoExist) {
            return {
              ok: false,
              error: "포토가 존재하지 않습니다.",
            };
          }

          const comment = await client.comment.create({
            data: {
              description,
              user: { connect: { id: loggedUser.id } },
              photo: { connect: { id: photoId } },
            },
          });

          return {
            ok: true,
            data: comment,
          };
        } catch (e) {
          console.log(e);
          return {
            ok: false,
            error: "알수 없는 오류가 발생했습니다.",
          };
        }
      }
    ),
  },
};
