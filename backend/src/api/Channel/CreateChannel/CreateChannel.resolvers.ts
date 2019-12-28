import { Resolvers } from "src/types/resolvers";
import {
  CreateChannelMutationArgs,
  CreateChannelResponse
} from "../../../../src/types/graphql";
import Channel from "../../../../src/entities/Channel";

const resolvers: Resolvers = {
  Mutation: {
    CreateChannel: async (
      _,
      args: CreateChannelMutationArgs
    ): Promise<CreateChannelResponse> => {
      try {
        const { channelName } = args;

        const channel = await Channel.findOne({ channelName });

        if (channel) {
          return {
            ok: false,
            error: "이미 존재하는 채널입니다."
          };
        }

        await Channel.create({
          channelName
        }).save();

        return {
          ok: true,
          error: null
        };
      } catch (error) {
        return {
          ok: false,
          error: error.message
        };
      }
    }
  }
};

export default resolvers;
