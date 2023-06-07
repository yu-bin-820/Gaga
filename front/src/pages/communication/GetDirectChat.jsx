import ChatBox from '@components/communication/ChatBox';
import ChatList from '@components/communication/ChatList';
import DirectChatBox from '@components/communication/DirectChatBox';
import useSocket from '@hooks/common/useSocket';
import GetChatTop from '@layouts/communication/GetChatTop';
import GetDirectTop from '@layouts/communication/GetDirectTop';
import { Box } from '@mui/material';
import useCommunityStore from '@stores/communication/useCommunityStore';
import fetcher from '@utils/fetcher';
import React, { useCallback, useEffect, useRef } from 'react';
import { Button, Input, MessageBox, MessageList } from 'react-chat-elements';
import useSWR from 'swr';
const GetDirectChat = () => {
  const boxRef = useRef();
  const { chatRoomEntryNo } = useCommunityStore();
  const { data: myData, mutate: mutateMe } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );
  const [socket, discconect] = useSocket('direct');

  const { data: directMessagesData, mutate: mutateDirectMessages } = useSWR(
    `${import.meta.env.VITE_EXPRESS_HOST}/rest/chat/direct/senderno/${
      myData?.userNo
    }/receiverno/${chatRoomEntryNo}`,
    fetcher
  );
  // console.log(
  //   `${import.meta.env.VITE_EXPRESS_HOST}/rest/chat/direct/senderno/${
  //     myData?.userNo
  //   }/receiverno/${chatRoomEntryNo}`
  // );

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

  const onMessage = useCallback(() => {
    mutateDirectMessages();
  }, [mutateDirectMessages]);

  useEffect(() => {
    socket?.on('directMessage', onMessage);
    return () => {
      socket?.off('directMessage', onMessage);
    };
  }, [socket, onMessage]);

  useEffect(() => {
    scrollToBottom();
  }, [directMessagesData, scrollToBottom]);

  if (!directMessagesData) {
    return <>로딩</>;
  }

  return (
    <div ref={boxRef}>
      <GetDirectTop receiverNo={chatRoomEntryNo} />
      <Box>
        <ChatList chatData={directMessagesData} />
        <Box sx={{ position: 'fixed', bottom: 65, left: 0, right: 0 }}>
          <DirectChatBox
            senderNo={myData?.userNo}
            receiverNo={parseInt(chatRoomEntryNo)}
            mutateDirectMessages={mutateDirectMessages}
          />
        </Box>
      </Box>
    </div>
  );
};

export default GetDirectChat;
