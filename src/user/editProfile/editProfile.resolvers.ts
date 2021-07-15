import { protectResolver } from "../user.utils";
import * as bcrypt from "bcrypt";
import { Resolvers } from "../types";
import { createWriteStream } from "fs";

const resolvers = {
  Mutation: {
    editProfile: protectResolver(
      async (
        _,
        { userName, lastName, firstName, password, email, avatar, bio },
        { loggedUser, client }
      ) => {
        let fileName;
        if (avatar) {
          const { filename, createReadStream } = await avatar;

          fileName = `${process.cwd()}/uploads/${
            loggedUser.id
          }-${Date.now()}-${filename}.png`;

          const stream = createReadStream();
          const writeStream = createWriteStream(fileName);
          stream.pipe(writeStream);
        }

        try {
          let hashedPassword;
          if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
          }

          await client.user.update({
            where: { id: loggedUser.id },
            data: {
              userName,
              lastName,
              firstName,
              password,
              email,
              bio,
              ...(avatar && { avatar: fileName }),
              ...(password && { password: hashedPassword }),
            },
          });

          return {
            ok: true,
          };
        } catch (e) {
          console.log(e);
          return {
            ok: false,
            error: "알수없는 에러가 발생했습니다. 관리자에게 문의하세요.",
          };
        }
      }
    ),
  },
};

export default resolvers;
