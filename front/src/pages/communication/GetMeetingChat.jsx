import { useEffect, useState, FormEvent, useCallback, useRef } from 'react';

import fetcher from '@utils/fetcher';

import axios from 'axios';

import useSWR from 'swr';

import { Box } from '@mui/material';
import useSocket from '@hooks/common/useSocket';
import useCommunityStore from '@stores/communication/useCommunityStore';
import ChatList from '@components/communication/ChatList';
import ChatBox from '@components/communication/ChatBox';
import useInput from '@hooks/common/useInput';
import useInputOrigin from '@hooks/common/useInputOrigin';
import CommonTop from '@layouts/common/CommonTop';
import GetChatTop from '@layouts/communication/GetChatTop';

const GetMeetingChat = () => {
  const { chatRoomEntryNo, chatRoomLeader } = useCommunityStore();

  const boxRef = useRef();

  const { data: myData, mutate: mutateMe } = useSWR(
    `http://${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  const [socket, discconect] = useSocket('meeting');

  const { data: meetingMessagesData, mutate: mutateMeetingMessages } = useSWR(
    `http://${
      import.meta.env.VITE_EXPRESS_HOST
    }/rest/chat/meetingno/${chatRoomEntryNo}/message/list/userno/${
      myData?.userNo
    }`,
    fetcher
  );

  const [chat, onChangeChat, setChat] = useInputOrigin('');

  const scrollToBottom = useCallback(() => {
    if (boxRef.current) {
      boxRef.current.scrollTop = boxRef.current.scrollHeight;

      window.scrollTo({ top: boxRef.current.scrollHeight });
    }
  }, [boxRef]);

  useEffect(() => {
    return () => {
      discconect();
    };
  }, [discconect]);

  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      if (chat?.trim()) {
        axios
          .post(
            `http://${
              import.meta.env.VITE_EXPRESS_HOST
            }/rest/chat/meeting/message`,
            {
              senderNo: myData.userNo,
              meetingNo: chatRoomEntryNo,
              content: chat,
              contentTypeNo: 1,
            },
            { withCredentials: true }
          )
          .then(() => {
            mutateMeetingMessages();
            setChat('');
          })
          .catch((error) => {
            console.dir(error);
          });
      }
    },
    [chat, setChat, mutateMeetingMessages, myData, chatRoomEntryNo]
  );

  const onKeydownChat = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        if (!e.shiftKey) {
          e.preventDefault();
          onSubmitForm(e);
        }
      }
    },
    [onSubmitForm]
  );
  const onClickChat = useCallback(
    (e) => {
      console.log(e);

      e.preventDefault();
      onSubmitForm(e);
    },
    [onSubmitForm]
  );

  const onMessage = useCallback(() => {
    mutateMeetingMessages();
  }, [mutateMeetingMessages]);

  useEffect(() => {
    socket?.on('message', onMessage);
    return () => {
      socket?.off('message', onMessage);
    };
  }, [socket, onMessage]);

  useEffect(() => {
    scrollToBottom();
  }, [meetingMessagesData, scrollToBottom]);
  if (!meetingMessagesData) {
    return <>로딩</>;
  }
  // console.log(meetingMessagesData);
  return (
    <div ref={boxRef}>
      <GetChatTop
        groupType={1}
        groupNo={chatRoomEntryNo}
        groupLeader={chatRoomLeader}
      />
      <Box>
        <ChatList chatData={meetingMessagesData} />
        <Box sx={{ position: 'fixed', bottom: 65, left: 0, right: 0 }}>
          <ChatBox
            chat={chat}
            onSubmitForm={onSubmitForm}
            setChat={setChat}
            onChangeChat={onChangeChat}
            onKeydownChat={onKeydownChat}
            onClickChat={onClickChat}
          />
        </Box>
      </Box>
    </div>
  );
};

export default GetMeetingChat;
