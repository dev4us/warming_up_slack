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
