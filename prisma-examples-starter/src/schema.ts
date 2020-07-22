import { intArg, makeSchema, objectType, stringArg } from '@nexus/schema';

const User = objectType({
  name: 'User',
  definition(t) {
    t.string('email');
  }
});

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.list.field('hello', {
      type: 'String',
      args: {},
      resolve: () => {
        return 'hi';
      }
    });
  }
});

export const schema = makeSchema({
  types: [Query, User]
});
