import { createWriteStream } from "fs";
import { uploadPhoto } from "../../share/share.utility";
import { protectResolver } from "../../user/user.utils";
import { getConnectOrCreate } from "../photo.utility";

const resolvers = {
  Mutation: {
    uploadPhoto: protectResolver(
      async (_, { caption, photo }, { client, loggedUser }) => {
        try {
          const { Location } = await uploadPhoto(photo, loggedUser.id);
          const newPhoto = await client.photo.create({
            data: {
              file: Location,
              ...(caption && { caption }),
              User: { connect: { id: loggedUser.id } },
              hashtags: {
                connectOrCreate: getConnectOrCreate(caption),
              },
            },
          });

          return {
            ok: true,
            photo: newPhoto,
          };
        } catch (e) {
          console.log(e);
          return {
            ok: false,
            error: "알수없는 에러가 발생했습니다.",
          };
        }
      }
    ),
  },
};
export default resolvers;
