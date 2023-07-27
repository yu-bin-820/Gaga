import { useEffect, useCallback, useRef } from 'react';

import fetcher from '@utils/fetcher';

import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';

import { Box } from '@mui/material';
import useSocket from '@hooks/common/useSocket';
import useCommunityStore from '@stores/communication/useCommunityStore';
import ChatList from '@components/communication/ChatList';
import ChatBox from '@components/communication/ChatBox';

import GetChatTop from '@layouts/communication/GetChatTop';

import makeSection from '@utils/makeSection';

const GetGroupChat = () => {
  const { chatRoomEntryNo, chatRoomLeader, chatType } = useCommunityStore();

  const boxRef = useRef();

  const { data: myData } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  const { data: roomLeaderData } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/user/userno/${chatRoomLeader}`,
    fetcher
  );

  const isMeeting = chatType === 2;
  const [socket] = useSocket(isMeeting ? 'meeting' : 'club');

  const getKey = (index, prevPageData) => {
    if (prevPageData && !prevPageData.length) {
      return null;
    }

    return `${import.meta.env.VITE_EXPRESS_HOST}/rest/chat/${
      isMeeting ? 'meetingno' : 'clubno'
    }/${chatRoomEntryNo}/message/list/userno/${
      myData?.userNo
    }?pageSize=20&page=${index + 1}`;
  };

  const {
    data: groupMessagesData,
    mutate: mutateGroupMessages,
    setSize,
  } = useSWRInfinite(getKey, fetcher);

  console.log(groupMessagesData);

  // const scrollToBottom = useCallback(() => {
  //   if (boxRef.current) {
  //     boxRef.current.scrollTo({ top: boxRef.current.scrollHeight });
  //   }
  // }, [boxRef]);

  const onMessage = useCallback(() => {
    console.log('onMessage');
    mutateGroupMessages();
    // scrollToBottom();
  }, [mutateGroupMessages]);

  useEffect(() => {
    socket?.on('message', onMessage);
    return () => {
      socket?.off('message', onMessage);
    };
  }, [socket, onMessage]);

  // useEffect(() => {
  //   scrollToBottom();
  // }, [groupMessagesData, scrollToBottom]);

  const chatData = makeSection(
    groupMessagesData ? groupMessagesData.flat().reverse() : []
    // groupMessagesData ? [...groupMessagesData] : []
  );
  console.log(chatRoomLeader, roomLeaderData);
  if (!groupMessagesData || !socket || !roomLeaderData) {
    return <>로딩</>;
  }

  // console.log(meetingMessagesData);

  return (
    <div>
      <GetChatTop
        groupType={chatType}
        groupNo={chatRoomEntryNo}
        groupLeader={roomLeaderData}
      />
      <Box ref={boxRef}>
        <ChatList chatData={chatData} setSize={setSize} />
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
