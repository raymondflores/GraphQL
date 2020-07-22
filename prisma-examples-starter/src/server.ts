import { GraphQLServer } from 'graphql-yoga';
import { schema } from './schema';

new GraphQLServer({ schema }).start(() =>
  console.log(
    `🚀 Server ready at: http://localhost:4000\n⭐️ See sample queries: http://pris.ly/e/ts/graphql#using-the-graphql-api`
  )
);
