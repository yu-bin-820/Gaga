import { Box } from '@mui/material';
import useCommunityStore from '@stores/communication/useCommunityStore';
import fetcher from '@utils/fetcher';
import React from 'react';
import { Button, Input, MessageBox, MessageList } from 'react-chat-elements';
import useSWR from 'swr';
const DirectChat = () => {
  const { chatRoomEntryNo, chatType, setField } = useCommunityStore();

  const { data: myData, mutate: mutateMe } = useSWR(
    `http://${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  const { data: clubMessagesData, mutate: mutateClubMessages } = useSWR(
    `http://${import.meta.env.VITE_EXPRESS_HOST}/rest/chat/group/list/userno/${
      myData?.userNo
    }`,
    fetcher
  );

  return (
    <Box sx={{ marginTop: '64x' }}>
      <MessageBox
        position={'left'}
        type={'photo'}
        text={'react.svg'}
        data={{
          uri: 'https://facebook.github.io/react/img/logo.svg',
          status: {
            click: false,
            loading: 0,
          },
        }}
      />
    </Box>
  );
};

export default DirectChat;
