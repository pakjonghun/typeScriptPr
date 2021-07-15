import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { Resolvers } from "../types";

const resolvers: Resolvers = {
  Mutation: {
    login: async (_, { email, password }, { loggedUser, client }) => {
      try {
        const nowUser = await client.user.findUnique({ where: { email } });
        if (!nowUser) {
          return { ok: false, error: "계정이 없습니다." };
        }

        const isPasswordCorrect = await bcrypt.compare(
          password,
          nowUser.password
        );
        if (!isPasswordCorrect) {
          return {
            ok: false,
            error: "비밀번호가 틀렸습니다.",
          };
        }

        const token = await jwt.sign(
          { id: nowUser.id },
          process.env.TOKEN_SECRET
        );

        return {
          ok: true,
          token,
        };
      } catch (e) {
        console.log(e);
        return { ok: false };
      }
    },
  },
};

export default resolvers;
