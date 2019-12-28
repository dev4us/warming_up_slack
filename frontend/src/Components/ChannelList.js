import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useQuery, useMutation } from "react-apollo-hooks";
import { GET_CHANNELS_QUERY, CREATE_CHANNEL } from "../queries";

const ChannelList = () => {
  const [channelName, setChannelName] = useState("");

  const { data, loading } = useQuery(GET_CHANNELS_QUERY);
  const [createChannel] = useMutation(CREATE_CHANNEL);

  const createChannelAction = () => {
    createChannel({
      variables: {
        channelName
      }
    });
  };

  return (
    <MainFrame>
      <Title>Slack with GraphQL</Title>
      <SubTitle>참여 가능 채널 목록</SubTitle>
      {loading && <Channel>Now Loading...</Channel>}
      {data &&
        data.GetChannels &&
        data.GetChannels.ok &&
        data.GetChannels.channels.map((channels, index) => (
          <Channel key={index}># {channels.channelName}</Channel>
        ))}
      <CreateChannelFrame>
        <CreateChannelInput
          placeholder="input new channel"
          value={channelName}
          onChange={e => setChannelName(e.target.value)}
        />
        <CreateChannelBtn onClick={() => createChannelAction()}>
          +
        </CreateChannelBtn>
      </CreateChannelFrame>
    </MainFrame>
  );
};

const MainFrame = styled.div`
  position: relative;
  width: 250px;
  height: 100%;
  padding: 15px 15px 15px 15px;
  background: #4d394b;
`;

const Title = styled.div`
  width: 100%;
  height: 40px;
  font-weight: bold;
  color: white;
  font-size: 20px;
  margin-top: 20px;
`;

const SubTitle = styled.div`
  width: 100%;
  height: 40px;
  font-weight: bold;
  color: #fffda7;
  font-size: 15px;
  margin-top: 20px;
`;

const Channel = styled.div`
  width: 100%;
  height: 30px;
  color: #8e8d8d;
  font-size: 15px;
  cursor: pointer;
  ${props =>
    props.isActive &&
    css`
      color: white;
      font-weight: bold;
      cursor: cursor;
    `}
`;

const CreateChannelFrame = styled.div`
  display: flex;
  position: absolute;
  width: 85%;
  height: 35px;
  bottom: 10px;
`;

const CreateChannelInput = styled.input`
  flex: 1;
  height: 100%;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border: 1px solid #dcdcdc;
  padding-left: 15px;
`;
const CreateChannelBtn = styled.button`
  width: 17%;
  height: 100%;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

export default ChannelList;
