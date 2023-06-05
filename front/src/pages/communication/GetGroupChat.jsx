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
import { useLocation } from 'react-router';

const GetGroupChat = () => {
  const { chatRoomEntryNo, chatRoomLeader, chatType } = useCommunityStore();

  const boxRef = useRef();

  const { data: myData, mutate: mutateMe } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );
  const isMeeting = chatType === 2;
  const [socket, discconect] = useSocket(isMeeting ? 'meeting' : 'club');

  const { data: groupMessagesData, mutate: mutateGroupMessages } = useSWR(
    `${import.meta.env.VITE_EXPRESS_HOST}/rest/chat/${
      isMeeting ? 'meetingno' : 'clubno'
    }/${chatRoomEntryNo}/message/list/userno/${myData?.userNo}`,
    fetcher
  );

  const scrollToBottom = useCallback(() => {
    if (boxRef.current) {
      boxRef.current.scrollTop = boxRef.current.scrollHeight;

      window.scrollTo({ top: boxRef.current.scrollHeight });
    }
  }, [boxRef]);

  useEffect(() => {
    return () => {
      if (socket) {
        discconect();
      }
    };
  }, [discconect, socket]);

  const onMessage = useCallback(() => {
    mutateGroupMessages();
  }, [mutateGroupMessages]);

  useEffect(() => {
    socket?.on('message', onMessage);
    return () => {
      socket?.off('message', onMessage);
    };
  }, [socket, onMessage]);

  useEffect(() => {
    scrollToBottom();
  }, [groupMessagesData, scrollToBottom]);
  if (!groupMessagesData || !socket) {
    return <>로딩</>;
  }
  // console.log(meetingMessagesData);

  return (
    <div ref={boxRef}>
      <GetChatTop
        groupType={chatType}
        groupNo={chatRoomEntryNo}
        groupLeader={chatRoomLeader}
      />
      <Box>
        <ChatList chatData={groupMessagesData} />
        <Box sx={{ position: 'fixed', bottom: 65, left: 0, right: 0 }}>
          <ChatBox
            senderNo={myData?.userNo}
            groupNo={chatRoomEntryNo}
            groupType={chatType}
            mutateGroupMessages={mutateGroupMessages}
          />
        </Box>
      </Box>
    </div>
  );
};

export default GetGroupChat;
