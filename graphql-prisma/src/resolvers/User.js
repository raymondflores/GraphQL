import getUserId from '../utils/getUserId'

const User = {
  email: {
    fragment: 'fragment userId on User { id }',
    resolve(parent, args, ctx, info) {
      const { request } = ctx
      const userId = getUserId(request, false)

      if (userId && userId === parent.id) {
        return parent.email
      }

      return null
    }
  },
  posts: {
    fragment: 'fragment userId on User { id }',
    resolve(parent, args, ctx, info) {
      const { prisma } = ctx

      return prisma.query.posts({
        where: {
          published: true,
          author: {
            id: parent.id
          }
        }
      })
    }
  }
}

export { User as default }
