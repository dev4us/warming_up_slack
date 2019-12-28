import React, { useContext, useState, useRef, useEffect } from "react";
import { useQuery, useMutation, useSubscription } from "react-apollo-hooks";
import { Store } from "../GlobalState/store";
import styled from "styled-components";
import {
  GET_MESSAGES_QUERY,
  SEND_MESSAGE,
  MESSAGE_SUBSCRIPTION
} from "../queries";

const ChatList = () => {
  const inputChat = useRef();
  const scrollRef = useRef();

  const { state } = useContext(Store);
  const [message, setMessage] = useState("");

  const { data } = useQuery(GET_MESSAGES_QUERY, {
    variables: { innerChannelId: state.selectedChannelId }
  });

  useEffect(() => {
    data &&
      data.GetMessages &&
      data.GetMessages.messages &&
      scrollToBottom(data.GetMessages.messages.length);
  }, [data]);
  const [sendChat] = useMutation(SEND_MESSAGE);

  const sendChatAction = () => {
    sendChat({
      variables: {
        nickname: state.nickname,
        contents: message,
        thumbnail: state.thumbnail,
        innerChannelId: state.selectedChannelId
      }
    });
    setMessage("");
    inputChat.current.focus();
  };

  useSubscription(MESSAGE_SUBSCRIPTION, {
    onSubscriptionData: ({
      client,
      subscriptionData: {
        data: { SendMessageSubscription }
      }
    }) => {
      try {
        let messages = client.readQuery({
          query: GET_MESSAGES_QUERY,
          variables: { innerChannelId: state.selectedChannelId }
        }).GetMessages.messages;

        if (
          SendMessageSubscription.innerChannelId === state.selectedChannelId
        ) {
          messages.push(SendMessageSubscription);

          client.writeQuery({
            query: GET_MESSAGES_QUERY,
            variables: { innerChannelId: state.selectedChannelId },
            data: {
              messages
            }
          });
          scrollToBottom(messages.length);
        }
      } catch (e) {
        console.log(e);
      }
    }
  });

  const setMessageByKey = e => {
    if (e.key === "Enter") {
      sendChatAction();
    }
  };

  const TimeConverter = timestamp => {
    if (!timestamp) {
      return;
    }
    let timestamp_date = new Date(parseInt(timestamp));
    const localString = timestamp_date.toLocaleString().split(".");
    return localString[3];
  };

  const scrollToBottom = messageCount => {
    scrollRef.current.scrollTo(0, messageCount * 80);
  };

  return (
    <MainFrame>
      <ChatListFrame ref={scrollRef}>
        {data &&
          data.GetMessages &&
          data.GetMessages.ok &&
          data.GetMessages.messages.map((message, index) => (
            <MessageFrame key={index}>
              <Thumbnail background={message.thumbnail}></Thumbnail>
              <ContentsFrame>
                <ContentsInFrame>
                  <NickName>{message.nickname}</NickName>
                  <DateTime>{TimeConverter(message.createdAt)}</DateTime>
                </ContentsInFrame>
                <ContentsInFrame>
                  <Contents>{message.contents}</Contents>
                </ContentsInFrame>
              </ContentsFrame>
            </MessageFrame>
          ))}
      </ChatListFrame>
      <ChatFrame>
        <ChatInput
          type="text"
          ref={inputChat}
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyPress={e => setMessageByKey(e)}
          placholder="input your message 😊"
        ></ChatInput>
      </ChatFrame>
    </MainFrame>
  );
};

const MainFrame = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: white;
`;

const ChatListFrame = styled.div`
  width: 100%;
  height: calc(100% - 60px);
  overflow-y: scroll;
`;

const MessageFrame = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
  padding: 5px 5px 5px 2.5%;
`;

const Thumbnail = styled.div`
  width: 45px;
  height: 45px;
  background: black;
  padding: 5px 5px 5px 5px;
  background-image: url(${props => props.background});
  background-size: cover;
  margin-top: 10px;
  border-radius: 5px;
`;

const ContentsFrame = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-left: 10px;
  padding-top: 2px;
`;

const ContentsInFrame = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 10px;
`;

const Contents = styled.div`
  font-size: 14px;
`;

const NickName = styled.div`
  font-size: 14px;
  font-weight: bold;
`;

const DateTime = styled.div`
  font-size: 10px;
  color: #5b5b5b;
  margin-left: 10px;
  padding-top: 2px;
`;

const ChatFrame = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px;
`;

const ChatInput = styled.input`
  width: 95%;
  height: 85%;
  border-radius: 5px;
  border: 1px solid #dcdcdc;
  color: black;
  padding-left: 15px;
  font-size: 15px;
  &:focus {
    border: 1px solid #505050;
  }
`;

export default ChatList;
