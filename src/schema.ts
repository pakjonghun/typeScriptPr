import {
  loadFilesSync,
  makeExecutableSchema,
  mergeResolvers,
  mergeTypeDefs,
} from "graphql-tools";

const loadTypeDefs = loadFilesSync(`${__dirname}/**/*.typeDefs.ts`);
const loadResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.ts`);

export const typeDefs = mergeTypeDefs(loadTypeDefs);
export const resolvers = mergeResolvers(loadResolvers);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
