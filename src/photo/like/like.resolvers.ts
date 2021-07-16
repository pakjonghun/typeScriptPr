import { isLeafType } from "graphql";
import { protectResolver } from "../../user/user.utils";

const resolvers = {
  Mutation: {
    like: protectResolver(async (_, { photoId }, { client, loggedUser }) => {
      try {
        const photoExist = await client.photo.count({ where: { id: photoId } });

        if (!photoExist) {
          return {
            ok: false,
            error: "사진이 없습니다.",
          };
        }

        const iLikedPhoto = await client.like.findFirst({
          where: { userId: loggedUser.id, photoId },
        });
        if (iLikedPhoto) {
          await client.like.delete({ where: { id: iLikedPhoto.id } });
        } else {
          await client.like.create({
            data: {
              user: { connect: { id: loggedUser.id } },
              photo: { connect: { id: photoId } },
            },
          });
        }

        return {
          ok: true,
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

export default resolvers;
