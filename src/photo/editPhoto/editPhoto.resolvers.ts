import { createWriteStream } from "fs";
import { protectResolver } from "../../user/user.utils";
import { getConnectOrCreate } from "../photo.utility";

const resolvers = {
  Mutation: {
    editPhoto: protectResolver(
      async (_, { id, caption, file }, { client, loggedUser }) => {
        try {
          const photoExist = await client.photo.findFirst({
            where: { id, userId: loggedUser.id },
            include: {
              hashtags: {
                select: {
                  hashtag: true,
                },
              },
            },
          });

          if (!photoExist) {
            return {
              ok: false,
              error: "수정할 수 있는 사진이 없습니다.",
            };
          }

          let fileName;

          if (file) {
            const { filename, createReadStream } = await file;
            fileName = `${process.cwd()}/uploads/${Date.now()}-${filename}`;
            const stream = createReadStream();
            const writeStream = createWriteStream(fileName);
            stream.pipe(writeStream);
          }

          const newPhoto = await client.photo.update({
            where: { id },
            data: {
              ...(file && { file: fileName }),
              ...(caption && { caption }),
              hashtags: {
                disconnect: photoExist.hashtags,
                connectOrCreate: getConnectOrCreate(caption),
              },
            },
          });

          return {
            ok: true,
            result: newPhoto,
          };
        } catch (e) {
          console.log(e);
          return {
            ok: false,
            error: "알수없는 오류가 발생했습니다.",
          };
        }
      }
    ),
  },
};

export default resolvers;
