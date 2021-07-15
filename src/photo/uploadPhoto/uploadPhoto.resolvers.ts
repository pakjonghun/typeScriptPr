import { createWriteStream } from "fs";
import { protectResolver } from "../../user/user.utils";

const resolvers = {
  Mutation: {
    uploadPhoto: protectResolver(
      async (_, { caption, photo }, { client, loggedUser }) => {
        try {
          let tagExists = caption.includes("#");
          let connectOrCreate = [];
          if (tagExists) {
            const tags = caption.match(/[\s]+#[\w-_]+/gi);
            const newTags = tags.map((item) => item.trim());
            connectOrCreate = newTags.map((item) => ({
              where: {
                hashtag: item,
              },
              create: {
                hashtag: item,
              },
            }));
          }

          const { createReadStream, filename } = await photo;
          const photoName = `${process.cwd()}/uploads/${Date.now()}-${filename}`;
          const stream = createReadStream();
          const writeStream = createWriteStream(photoName);
          stream.pipe(writeStream);
          const newPhoto = await client.photo.create({
            data: {
              file: photoName,
              ...(caption && { caption }),
              User: { connect: { id: loggedUser.id } },
              ...(connectOrCreate.length > 0 && {
                hashtags: {
                  connectOrCreate,
                },
              }),
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
