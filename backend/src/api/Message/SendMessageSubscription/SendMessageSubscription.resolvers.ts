const resolvers = {
  Subscription: {
    SendMessageSubscription: {
      subscribe: (_, __, { pubSub }) => {
        return pubSub.asyncIterator("newMessage");
      }
    }
  }
};

export default resolvers;
