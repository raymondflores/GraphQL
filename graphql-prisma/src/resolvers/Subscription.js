import getUserId from '../utils/getUserId'

const Subscription = {
  comment: {
    subscribe(parent, args, { prisma }, info) {
      const { postId } = args

      return prisma.subscription.comment(
        {
          where: {
            node: {
              post: {
                id: postId
              }
            }
          }
        },
        info
      )
      // return pubsub.asyncIterator(`comment ${postId}`)
    }
  },
  post: {
    subscribe(parent, args, { prisma }, info) {
      return prisma.subscription.post(
        {
          where: {
            node: {
              published: true
            }
          }
        },
        info
      )
      // return pubsub.asyncIterator('post')
    }
  },
  myPost: {
    subscribe(parent, args, { prisma, request }, info) {
      const userId = getUserId(request)

      return prisma.subscription.post(
        {
          where: {
            node: {
              author: {
                id: userId
              }
            }
          }
        },
        info
      )
    }
  }
}

export { Subscription as default }
