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
  }
}

export { Subscription as default }
