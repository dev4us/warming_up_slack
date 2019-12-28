import { GraphQLServer } from "graphql-yoga";
import connection from "./ormConfig";

const typeDefs = `
  type Query{
    sayHello: String!
  }
`;
const resolvers = {
  Query: {
    sayHello: () => "Hi there 🙂"
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });

connection.then(() =>
  server.start(() =>
    console.log("My First GraphQL Server is running on localhost:4000")
  )
);
