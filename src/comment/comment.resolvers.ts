import { Resolvers } from "../user/types";

const resolvers: Resolvers = {
  Comment: {
    isMine: (root, _, { client, loggedUser }) => console.log(root),
  },
};

export default resolvers;
