import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import 'react-chat-elements/dist/main.css';
import { ChatItem } from 'react-chat-elements';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { useNavigate } from 'react-router';
import useCommunityStore from '@stores/communication/useCommunityStore';
import MainBottomNav from '@layouts/common/MainBottomNav';
import ListChatRoomTop from '@layouts/communication/ListChatRoomTop.jsx';
import { Badge } from '@mui/material';
import { useCallback, useState } from 'react';

export default function ListChatRoom() {
  const navigate = useNavigate();

  const { chatRoomEntryNo, chatType, setField } = useCommunityStore();

  const { data: myData, mutate: mutateMe } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  const { data: groupsData, mutate: mutateGroups } = useSWR(
    `${import.meta.env.VITE_EXPRESS_HOST}/rest/chat/group/list/userno/${
      myData?.userNo
    }`,
    fetcher
  );

  const { data: directListData, mutate: mutateDirectMessages } = useSWR(
    `${import.meta.env.VITE_EXPRESS_HOST}/rest/chat/direct/list/userno/${
      myData?.userNo
    }`,
    fetcher
  );

  const { data: unreadsData, mutate: mutateUnreads } = useSWR(
    `${
      import.meta.env.VITE_EXPRESS_HOST
    }/rest/chat/group/message/unreads/userno/${myData?.userNo}`,
    fetcher
  );

  console.log(
    `${import.meta.env.VITE_EXPRESS_HOST}/rest/chat/direct/list/userno/${
      myData?.userNo
    }`,
    directListData
  );

  const [value, setValue] = useState('group');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onClickGroupChatOne = useCallback(
    (e) => {
      const selectedData = JSON.parse(e.currentTarget.dataset.value);
      console.log(selectedData.chatRoomEntryNo);

      setField('chatRoomEntryNo', selectedData.chatRoomEntryNo);
      setField('chatType', selectedData.chatType);
      setField('chatRoomLeader', selectedData.chatRoomLeader);

      navigate(`/chat/group/message/list`);
    },
    [setField, navigate]
  );

  const onClickDirectChat = useCallback(
    (e) => {
      setField('chatRoomEntryNo', e.currentTarget.dataset.value);
      navigate('/chat/direct/message/list');
    },
    [navigate, setField]
  );

  console.log(groupsData);
  if (!directListData) {
    return <>로딩</>;
  }
  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          marginTop: '50px',
          width: '100%',
          typography: 'body1',
        }}
      >
        <ListChatRoomTop />
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab
                label={
                  <Badge
                    color="error"
                    variant="dot"
                    badgeContent={unreadsData?.countGroupUnreads}
                  >
                    Group
                  </Badge>
                }
                value="group"
                sx={{ minWidth: '50%' }}
              />
              <Tab
                label={
                  <Badge
                    color="error"
                    variant="dot"
                    badgeContent={unreadsData?.countDirectUnreads}
                  >
                    DM
                  </Badge>
                }
                value="direct"
                sx={{ minWidth: '50%' }}
              />
            </TabList>
          </Box>
          <Box
            sx={{
              padding: '0px',
              marginLeft: '0px',
              marginRight: '0px',
              overflowY: 'auto',
              maxHeight: 'calc(100vh - 70px)',
              marginBottom: '64px',
            }}
          >
            <TabPanel value="group" sx={{ margin: 0, paddingLeft: 0.5 }}>
              {groupsData?.groups.map((group, i) => (
                <Box
                  key={i}
                  sx={{
                    marginBottom: '10px',
                    padding: '5px',
                    minWidth: '100%',
                  }}
                  data-value={JSON.stringify(
                    group.meeting_no
                      ? {
                          chatRoomEntryNo: group.meeting_no,
                          chatType: 2,
                          chatRoomLeader: group.MeetingLeader,
                        }
                      : {
                          chatRoomEntryNo: group.club_no,
                          chatType: 1,
                          chatRoomLeader: group.ClubLeader,
                        }
                  )}
                  onClick={onClickGroupChatOne}
                >
                  <ChatItem
                    avatar={`${import.meta.env.VITE_EXPRESS_HOST}/uploads/${
                      group.meeting_img
                    }`}
                    alt={`${
                      import.meta.env.VITE_EXPRESS_HOST
                    }/uploads/group_alt.jpg`}
                    title={
                      group.meeting_name ? group.meeting_name : group.club_name
                    }
                    subtitle={group.last_message}
                    date={new Date(group.last_message_time)}
                    unread={group.unreadMessages}
                  />
                </Box>
              ))}
            </TabPanel>

            <TabPanel value="direct">
              {directListData?.map((direct, i) => (
                <Box
                  key={i}
                  sx={{
                    marginBottom: '10px',
                    padding: '5px',
                    minWidth: '100%',
                  }}
                  data-value={
                    direct.receiver_no === myData?.userNo
                      ? direct.sender_no
                      : direct.receiver_no
                  }
                  onClick={onClickDirectChat}
                >
                  <ChatItem
                    avatar={'http://facebook.github.io/react/img/logo.svg'}
                    alt={`${
                      import.meta.env.VITE_EXPRESS_HOST
                    }/uploads/user_alt.jpg`}
                    title={
                      direct.receiver_no === myData?.userNo
                        ? direct.Sender?.nick_name
                        : direct.Receiver?.nick_name
                    }
                    subtitle={direct.content}
                    date={new Date(direct.created_at)}
                    unread={direct.unreadMessages}
                  />
                </Box>
              ))}
            </TabPanel>
          </Box>
        </TabContext>
      </Box>
      <MainBottomNav pageName="chat" />
    </>
  );
}
