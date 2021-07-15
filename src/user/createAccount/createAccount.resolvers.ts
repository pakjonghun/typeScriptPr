import client from "../../client";
import * as bcrypt from "bcrypt";
import { createWriteStream } from "fs";

const resolvers = {
  Mutation: {
    createAccount: async (
      _,
      { userName, lastName, email, password, firstName, avatar, bio }
    ) => {
      try {
        const userExist = await client.user.findFirst({
          where: { OR: [{ userName }, { email }] },
        });
        if (userExist) {
          return { ok: false, error: "동일한 계정이 존재합니다." };
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        let fileName;
        if (avatar) {
          const { filename, createReadStream } = await avatar;
          fileName = `${process.cwd()}/uploads/${Date.now()}_${filename}.png`;
          const stream = createReadStream();
          const writeStream = createWriteStream(fileName);
          stream.pipe(writeStream);
        }

        await client.user.create({
          data: {
            firstName,
            userName,
            lastName,
            email,
            password: hashedPassword,
            ...(avatar && { avatar: fileName }),
            bio,
          },
        });

        return { ok: true };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "알수없는 에러가 발생했습니다. 관리자에게 문의하세요.",
        };
      }
    },
  },
};

export default resolvers;
