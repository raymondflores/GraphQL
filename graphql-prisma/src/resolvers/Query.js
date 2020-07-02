const Query = {
  users(parent, args, { prisma }, info) {
    const { query } = args
    const opArgs = {}

    if (query) {
      opArgs.where = {
        OR: [
          {
            name_contains: query
          },
          {
            email_contains: query
          }
        ]
      }
    }

    return prisma.query.users(opArgs, info)
  },
  posts(parent, args, { prisma }, info) {
    const { query } = args
    const opArgs = {}

    if (query) {
      opArgs.where = {
        OR: [
          {
            title_contains: query
          },
          {
            body_contains: query
          }
        ]
      }
    }

    return prisma.query.posts(opArgs, info)
  },
  comments(parent, args, { prisma }, info) {
    return prisma.query.comments(null, info)
  },
  me() {
    return {
      id: '123',
      name: 'Raymond',
      email: 'ray@aol.com',
      age: 27
    }
  },
  post() {
    return {
      id: '092',
      title: 'Hello World',
      body: 'This is my first post',
      published: true
    }
  }
}

export { Query as default }
