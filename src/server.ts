require("dotenv").config();
import express from "express";
import { graphqlUploadExpress } from "graphql-upload";

import client from "./client";
import { getUser } from "./user/user.utils";
import { typeDefs, resolvers } from "./schema";
import { ApolloServer } from "apollo-server-express";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema";
import { buildTypeDefsAndResolvers } from "type-graphql";
import morgan from "morgan";

const PORT = process.env.PORT;

const startServer = async () => {
  const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => ({
      loggedUser: await getUser(req.headers.authorization),
      client,
    }),
  });
  await apollo.start();

  const app = express();

  app.use(graphqlUploadExpress());
  app.use(morgan("tiny"));
  app.use("/static", express.static(`${process.cwd()}/uploads`));
  apollo.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost${PORT}`);
  });
};

startServer();
