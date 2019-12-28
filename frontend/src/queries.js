import gql from "graphql-tag";

export const GET_CHANNELS_QUERY = gql`
  query {
    GetChannels {
      ok
      channels {
        id
        channelName
      }
    }
  }
`;

export const CREATE_CHANNEL = gql`
  mutation createChannel($channelName: String!) {
    CreateChannel(channelName: $channelName) {
      ok
      error
    }
  }
`;

export const CHANNELS_SUBSCRIPTION = gql`
  subscription CreateChannelSubscription {
    CreateChannelSubscription {
      id
      channelName
    }
  }
`;

export const GET_MESSAGES_QUERY = gql`
  query getMessages($innerChannelId: Int!) {
    GetMessages(innerChannelId: $innerChannelId) {
      ok
      messages {
        nickname
        thumbnail
        contents
        createdAt
      }
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation sendMessage(
    $nickname: String!
    $thumbnail: String!
    $contents: String!
    $innerChannelId: Int!
  ) {
    SendMessage(
      nickname: $nickname
      thumbnail: $thumbnail
      contents: $contents
      innerChannelId: $innerChannelId
    ) {
      ok
      error
    }
  }
`;

export const MESSAGE_SUBSCRIPTION = gql`
  subscription SendMessageSubscription {
    SendMessageSubscription {
      nickname
      thumbnail
      contents
      createdAt
      innerChannelId
    }
  }
`;
