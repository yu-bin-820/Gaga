import ChatBox from '@components/communication/ChatBox';
import ChatList from '@components/communication/ChatList';
import DirectChatBox from '@components/communication/DirectChatBox';
import useSocket from '@hooks/common/useSocket';
import GetChatTop from '@layouts/communication/GetChatTop';
import GetDirectTop from '@layouts/communication/GetDirectTop';
import { Box } from '@mui/material';
import useCommunityStore from '@stores/communication/useCommunityStore';
import fetcher from '@utils/fetcher';
import makeSection from '@utils/makeSection';
import React, { useCallback, useEffect, useRef } from 'react';
import { Button, Input, MessageBox, MessageList } from 'react-chat-elements';
import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';
const GetDirectChat = () => {
  const boxRef = useRef();
  const { chatRoomEntryNo } = useCommunityStore();
  const { data: myData, mutate: mutateMe } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );
  const [socket, discconect] = useSocket('direct');

  const getKey = (index, prevPageData) => {
    if (prevPageData && !prevPageData.length) {
      return null;
    }

    return `${import.meta.env.VITE_EXPRESS_HOST}/rest/chat/direct/senderno/${
      myData?.userNo
    }/receiverno/${chatRoomEntryNo}?pageSize=20&page=${index + 1}`;
  };

  const {
    data: directMessagesData,
    mutate: mutateDirectMessages,
    setSize,
  } = useSWRInfinite(getKey, fetcher);
  // console.log(
  //   `${import.meta.env.VITE_EXPRESS_HOST}/rest/chat/direct/senderno/${
  //     myData?.userNo
  //   }/receiverno/${chatRoomEntryNo}`
  // );

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

  const chatData = makeSection(
    // groupMessagesData ? groupMessagesData.flat() : []
    directMessagesData ? directMessagesData.flat() : []
  );

  if (!directMessagesData) {
    return <>로딩</>;
  }

  return (
    <div ref={boxRef}>
      <GetDirectTop receiverNo={chatRoomEntryNo} />
      <Box>
        <ChatList chatData={chatData} setSize={setSize} />
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
